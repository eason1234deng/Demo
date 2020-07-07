module.exports = (app, User, passport) => {
    require('./auth')(app, passport);
    require('./email')(app, User);
    require('./payment')(app, User);
    require('./users')(app);
    require('./root')(app);
};