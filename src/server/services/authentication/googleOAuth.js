const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { authCallback } = require('../../utils/helpers');
const constants = require('../../constants/constants');

module.exports = (User, passport) => {
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_OAUTH_CB_URL,
            scope: constants.GOOGLE_OAUTH_SCOPE,
            proxy: true
        },
        authCallback(User)
    ));
};