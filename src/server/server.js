require('dotenv').config({ path: './.env.local'});

const express = require("express");
const passport = require("passport");
const User = require('./schemas/User');
const Login = require('./schemas/Login');

const app = express();

// Apply all middlewares
require('./middlewares/serverInit')(app, User, passport);

// Set up Authentication
require('./services/authentication')(User, Login, passport);

// Set up all routes
require('./routes')(app, User, passport);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));

