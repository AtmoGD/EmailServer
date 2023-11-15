const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

var nodeMailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gdatmo@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

app.get("/", (req, res) => RequestConcept(req, res));

async function RequestConcept(req, res) {
    res.header("Access-Control-Allow-Origin", "*");


    const name = req.query.name;
    const email = req.query.email;
    const message = req.query.message;

    const response = "From: " + name + "\nEmail: " + email + "\nMessage: " + message;

    var mailOptions = {
        from: 'gdatmo@gmail.com',
        to: 'dennishawran@gmail.com',
        subject: 'New Email from your website!',
        text: response
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.type('application/json').send("Aw snap! Something went wrong.");
        } else {
            console.log('Email sent: ' + info.response);
            res.type('application/json').send("Email sent!");
        }
    });

}

app.listen(port, () => console.log(`Listening on port ${port}!`));