const express = require("express");
const nodeMailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => RequestConcept(req, res));

async function RequestConcept(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    const name = req.query.name;
    const email = req.query.email;
    const message = req.query.message;

    const response = "From: " + name + "\nEmail: " + email + "\nMessage: " + message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gdatmo@gmail.com',
            pass: process.env.EMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: 'gdatmo@gmail.com',
        to: 'dennishawran@gmail.com',
        subject: 'New Email from your website!',
        text: response
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error)
            console.log(error);
        else
            console.log('Email sent: ' + info.response);
    });

    res.type('application/json').send("Email maybe sent!");

}

app.listen(port, () => console.log(`Listening on port ${port}!`));