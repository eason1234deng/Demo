const { requireLogin } = require('../utils/helpers');

module.exports = app => {
    app.put('/logout', async (req, res) => {
        try {
            const { credits } = req.body;
            const user = req.user;
            req.logout();
            user.credits = credits;
            await user.save();
            res.sendStatus(200);
        } catch {
            res.sendStatus(500);
        }    
    });

    app.put('/user/update/credits', requireLogin, async (req, res) => {
        try {
            const { credits } = req.body;
            req.user.credits = credits;
            await req.user.save();
            res.sendStatus(200);
        } catch {
            res.sendStatus(500);
        } 
    });
}