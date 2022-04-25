const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var cron = require('node-cron');
const _ = require('lodash')
const app = express();
require('dotenv').config({
    path: './app/.env'
})

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to The notification application."
    });
});

// routes
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(` server started at port ${process.env.PORT}`)
});