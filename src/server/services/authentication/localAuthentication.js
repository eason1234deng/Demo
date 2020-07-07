const LocalStrategy = require('passport-local').Strategy;
const { validateLogin, validateRegistration } = require('../../utils/helpers');
const constants = require('../../constants/constants');

// For ordinary signin/logout authentications and registration
module.exports = (User, Login, passport) => {
    passport.use(constants.LOCAL_AUTH.LOGIN, new LocalStrategy(
        {
            usernameField: 'email'
        },
        validateLogin(User, Login),
    ));
    
    passport.use(constants.LOCAL_AUTH.REGISTER, new LocalStrategy(
        {
            usernameField: 'email',
            passReqToCallback: true
        },
        validateRegistration(User, Login),
    ));
};