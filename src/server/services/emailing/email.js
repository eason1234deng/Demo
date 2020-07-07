const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_SECRET_KEY);
const EMAIL_TEMPLATE  = JSON.parse(process.env.EMAIL_TEMPLATE_OBJECT);

// Use sendgrid to do the emailing
function sendEmail(data, res) {
    const msg = {
        to: data.recipient,
        from: data.sender,
        templateId: EMAIL_TEMPLATE[data.templateName],
        dynamic_template_data: {
            name: data.name,
            confirmAccURL: data.confirmAccURL
        }
    };
    
    sgMail.send(msg)
    .then(result => res.send(result))
    .catch(error => res.status(400).json(error));
}

module.exports = sendEmail;
