const passport = require("passport");
const { Passport } = require("passport");

module.exports = (User, Login, passport) => {
    require('./googleOAuth')(User, passport);
    require('./githubOAuth')(User, passport);
    require('./localAuthentication')(User, Login, passport);
};