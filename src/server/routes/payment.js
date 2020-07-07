const constants = require('../constants/constants');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = (app, User) => {
    app.get('/config/stripe', (_, res) => { // hard-coding base price and currency for now
        res.send({
            publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
            basePrice: constants.BASE_PRICE, // Keep the amount on the server to prevent customers from manipulating on client
            currency: constants.CURRENCY
        });
    });

    app.post('/create-checkout-session', async (req, res) => {
        // const domainURL = req.headers.referer;
        const { quantity, locale } = req.body;
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: constants.PAYMENT_METHODS.split(', '),
                locale: locale || constants.AUTO_LOCALE,
                metadata: {
                    id: req.user.id
                },
                line_items: [
                    {
                        name: 'Item 1 photo',
                        description: 'Description for item 1',
                        images: ['https://picsum.photos/300/300?random=4'],
                        quantity: quantity,
                        currency: constants.CURRENCY,
                        amount: constants.BASE_PRICE,
                    },
                    {
                        name: 'Item 2 photo',
                        description: 'Description for item 2',
                        images: ['https://picsum.photos/300/300?random=3'],
                        quantity: quantity,
                        currency: constants.CURRENCY,
                        amount: constants.BASE_PRICE,
                    },
                ],
                success_url: `${process.env.SERVER_ROOT}/payment_sucess/?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.SERVER_ROOT}/payment_fail/?session_id={CHECKOUT_SESSION_ID}`,
                customer_email: process.env.CUSTOMER_EMAIL_ADDRESS
            });
            res.send({
                sessionId: session.id
            })
        } catch (error) {
            console.log(error);
        }
    });

    app.get('/payment_fail', async (req, res) => {
        try {
            console.log('Payment Failed!: ', req.query.session_id);
        } catch (err) {
            console.log(err);
        } finally {
            res.redirect(process.env.CLIENT_HOME_PAGE);
        }
    });


    app.get('/payment_sucess', async (req, res) => {
        try {
            const sessionId = req.query.session_id;
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            req.user.credits += session.display_items[0].quantity;
            await req.user.save();
            console.log('Payment success!: ', sessionId);
        } catch (err) {
            console.log(err);
        } finally {
            res.redirect(process.env.CLIENT_HOME_PAGE);
        }
    });

    // Stripe will send us events actively
    app.post('/webhook', async (req, res) => {
        const stripeWebHookKey = process.env.STRIPE_WEBHOOK_KEY;
        let eventType;
        let data;
        if (stripeWebHookKey) { // data is signed by stripe.com
            const signature = req.headers['stripe-signature'];
            try {
                const event = stripe.webhooks.constructEvent(
                    req.rawBody,
                    signature,
                    stripeWebHookKey
                );
                eventType = event.type;
                data = event.data;
            } catch (error) {
                console.log(error);
                return res.sendStatus(400).end();
            }
        } else {
            eventType = req.body.type
        }

        if (eventType === 'checkout.session.completed') { // Payment is actually received
            try {
                console.log('Payment received!');
                data = data.object;
                // const sessionId = data.id;
                // const session = await stripe.checkout.sessions.retrieve(sessionId);
                // const user = await User.findOne({ _id: data.metadata.id });
                // user.credits += session.display_items[0].quantity;
                // await user.save();
            } catch (err) {
                console.log(err);
            } finally {
                res.redirect(process.env.CLIENT_HOME_PAGE);
                return;
            }
        }

        res.sendStatus(200);
    });
}