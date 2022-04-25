const _ = require("lodash");
const nodemailer = require('nodemailer');
const twilio = require('twilio')



//API for sending notification
exports.notificationSending = async (req, res) => {

    try {
        if (req.body.notification_type == "email") {

            if (_.isEmpty(req.body.from_email) || _.isEmpty(req.body.password) || _.isEmpty(req.body.title) || _.isEmpty(req.body.description || _.isEmpty(req.body.to_email))) {
                return res.json({
                    success: false,
                    message: 'please enter title, password, email, description',
                });

            } else {
                var myEmail = req.body.from_email
                var myPassword = process.env.email_password
                var usersEmail = req.body.to_email
                var mySubject = req.body.title
                var myText = req.body.description

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: myEmail,
                        pass: myPassword
                    }
                });

                var mailOptions = {
                    from: myEmail,
                    to: usersEmail,
                    subject: mySubject,
                    text: myText
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {

                        return res.json({
                            success: true,
                            message: 'mail sent successfully for selected user/users',
                        });
                    }
                });
            }
        } else if (req.body.notification_type == "whatsapp") {

            const id = process.env.twillio_id;
            const token = process.env.twilio_token;

            // Creating a client
            const client = twilio(id, token);

            // Sending messages to the client
            let userNumbers = [+919999999999, +9111111111111]

            userNumbers.map((number) => {
                client.messages.create({
                        // Message to be sent
                        body: req.body.message,
                        // Senders Number (Twilio Sandbox No.)
                        from: 'whatsapp:' + req.body.senders_number,
                        // Number receiving the message
                        to: 'whatsapp:' + number
                    })
                    .then(message => console.log("Message sent successfully"))
                    .done();
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            error: error,
            message: 'Something went wrong',
        });
    }

}