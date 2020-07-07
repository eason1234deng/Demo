const { requireLogin } = require('../utils/helpers');

module.exports = app => {
    app.get('/', requireLogin, (req, res) => {
        res.send(req.user);
    });
};