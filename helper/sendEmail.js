const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (reciever, source, content) => {
    try {
        const msg = {
            to: reciever, // Change to your recipient
            from: source, // Change to your verified sender
            subject: 'Reset Password',
            html: content
        };
        return sgMail.send(msg);
    } catch (e) {
        return new Error(e);
    }
};

module.exports = sendEmail;