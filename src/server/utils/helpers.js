const bcrypt = require("bcrypt"); // TODO: use bcrypt instead
const constants = require('../constants/constants');

const authCallback = (User) => async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ oauth_id: profile.id });
        if (!user) {
            let email;
            const name = profile.displayName || profile.username;
            for (const currEmail of profile.emails) {
                if (profile.provider === 'google' || currEmail.primary) {
                    email = currEmail.value;
                    break;
                }
            }
            user = await new User({ oauth_id: profile.id, email, name }).save();
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
};

const validateLogin = (User, Login) => async (email, password, done) => {
    try { 
        // Get encrypted password
        let result = await Login.findOne({ email });
        if (!result) {
            done(null, false, { message: 'Incorrect Email' });
            return;
        }
    
        // Compare password
        const match = await bcrypt.compare(password, result.hash);
        if (!match) {
            done(null, false, { message: 'Incorrect Login' });
            return;
        }

        // Fetch user from database and return to user
        result = await User.findOne({ email });
        if (!result) {
            done(null, false, { message: 'Incorrect Email' });
        } else {
            done(null, result);
        }
    } catch {
        done(null, false);
    }
};

const validateRegistration = (User, Login) => async (req, email, password, done) => {
    try {
        const { name } = req.body;
        if (!constants.STRONG_PASSWORD_REGEX.test(password)) {
            done(null, false, { message: 'Password is in incorrect format' });
            return;
        }
        if (!constants.EMAIL_REGEX.test(email)) {
            done(null, false, { message: 'Email is in incorrect format' });
            return;
        }
        const user = await User.findOne({ email });
        if (user) {
            done(null, false, { message: 'User already exist' });
            return;
        }

        const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND));
        if (!hash) {
            done(null, false, { message: 'Unable to register' })
            return;
        }

        const session = await Login.startSession();
        session.startTransaction();

        try {
            const opts = { session };
            await new Login({ email, hash }).save(opts);
            const user = await new User({ email, name }).save(opts);
            await session.commitTransaction();
            done(null, user);
        } catch {
            await session.abortTransaction();
            done(null, false, { message: 'Unable to register' })
        } finally {
            session.endSession();
        }
    } catch {
        done(null, false);
    }
};

const requireLogin = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ message: 'User has not yet authenticated' });
    } else {
        next();
    }
};

const requireUnConfirm = (req, res, next) => {
    if (req.user.confirmed) {
        res.status(401).json({ message: 'You have already confirmed' });
    } else {
        next();
    }
};

module.exports = {
    authCallback,
    validateLogin,
    validateRegistration,
    requireLogin,
    requireUnConfirm
};
