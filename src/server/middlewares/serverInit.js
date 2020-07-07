const express = require("express");
const cookieSession = require('cookie-session');
const cookieParser = require("cookie-parser");
const cors = require('cors');
require("mongoose").connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Apply all middlewares to server
module.exports = (app, User, passport) => {

    // Parsers
    app.use(cookieParser());
    app.use(
        express.json({
        verify: function (req, res, buf) {
            if (req.originalUrl.startsWith('/webhook')) { // for handling webhook requests from stripe
            req.rawBody = buf.toString();
            }
        },
        })
    );

    // Cross origin browser requests
    app.use(cors({
        origin: process.env.CLIENT_HOME_PAGE, // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    }));

    // Middleware for cookies and authentications
    app.use(
        cookieSession({
            maxAge: 30 * 24 * 60 * 60 * 1000, // how long cookie can exist before it expires in milliseconds (last for 30 days for our example here)
            keys: [process.env.COOKIE_SECRETE_KEY] // key used to encrypt our cookie
        })
    );

    app.use(passport.initialize());
    app.use(passport.session()); // deserialize decrypted cookie into a user object


    // Chrome caches responses then returns it without querying this server -> this is to avoid it
    app.use((_, res, next) => {
        res.setHeader('Cache-Control', ["no-cache", "no-store", "must-revalidate"]);
        res.setHeader("Pragma", "no-cache");
        res.setHeader('Expires', 0)
        next();
    });

    // Serialization and Deserialization of data object
    // Turn user object into cookie data
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Turn decrypted cookie data back into user object
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => done(null, user))
            .catch(error => done(error, null));
    });
};