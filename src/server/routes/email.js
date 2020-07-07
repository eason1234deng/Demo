const sendEmail = require('../services/emailing/email');
const { requireLogin, requireUnConfirm } = require('../utils/helpers');

module.exports = (app, User) => {
    app.get('/confirmation/send', requireLogin, requireUnConfirm, (req, res) => {
        const data = {
            templateName: process.env.CONFIRMATION_EMAIL_TEMPLATE_NAME,
            sender: process.env.SERVER_EMAIL_ADDRESS,
            recipient: req.user.email,
            name: req.user.name,
            confirmAccURL: `${process.env.SERVER_ROOT}/confirmation/${req.user.id}`
        }
        sendEmail(data, res);
    });
    
    app.get('/confirmation/:id', async (req, res) => {
        let user = req.user;
        if (!user) {
            user = await User.findOne({ _id: req.params.id });
            req.login(user, console.log); // Login user -> send them a cookie
        }
        user.confirmed = true;
        await user.save();
        res.redirect(process.env.CLIENT_HOME_PAGE);
    });
}