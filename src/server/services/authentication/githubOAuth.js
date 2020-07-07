const GitHubStrategy = require('passport-github').Strategy;
const { authCallback } = require('../../utils/helpers');
const constants = require('../../constants/constants');

module.exports = (User, passport) => {
    passport.use(new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_OAUTH_CB_URL,
            scope: constants.GITHUB_OAUTH_SCOPE,
            proxy: true
        },
        authCallback(User)
    ));
};