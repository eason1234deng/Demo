const constants = require('../constants/constants');

module.exports = (app, passport) => {
    app.get('/auth/google', passport.authenticate('google'));

    app.get('/auth/google/callback', passport.authenticate('google'), (_, res) => {
        res.redirect(process.env.CLIENT_HOME_PAGE); // Set-Cookie in header if client doesn't have cookies
    });
    
    app.get('/auth/github', passport.authenticate('github'));
    
    app.get('/auth/github/callback', passport.authenticate('github'), (_, res) => {
        res.redirect(process.env.CLIENT_HOME_PAGE);
    });
    
    app.post('/signin', passport.authenticate(constants.LOCAL_AUTH.LOGIN), (req, res) => {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.json(req.user);
    });
    
    app.post('/register', passport.authenticate(constants.LOCAL_AUTH.REGISTER), (req, res) => {
        res.json(req.user);
    });
};