const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => RequestConcept(req, res));

async function RequestConcept(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    const name = req.query.name;
    const email = req.query.email;
    const message = req.query.message;

    const response = {
        name: name,
        email: email,
        message: message
    };

    console.log("NEW ENTRY: " + name + email + message);
    console.log("___________________________________________________________________");

    res.type('application/json').send(response);
}