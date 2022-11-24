const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {checkout} = require("../services/checkout_service");
const cons = require("consolidate");
var cookieParser = require('cookie-parser')


app.get("/checkout", urlencodedParser, async function (request, response) {

    let cookie = request.headers.cookie;


    var output = {};
    cookie.split(/\s*;\s*/).forEach(function(pair) {
    pair = pair.split(/\s*=\s*/);
    var name = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair.splice(1).join('='));
    output[name] = value;
    });

    console.log(output);


    let res = await checkout(output.cart, output.emailId);



    response.send("");

});

module.exports = router;
