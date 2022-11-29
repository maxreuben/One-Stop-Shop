const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { sendMail } = require("../services/email");
const cons = require("consolidate");
var cookieParser = require("cookie-parser");

app.post("/sendMail", urlencodedParser, async function (request, response) {
  let toAddress = request.body.to;
  let subject = request.body.subject;
  let text = request.body.text;

  console.log(toAddress, subject, text);

  let res = await sendMail(toAddress, subject, text);

  response.send({ status: 200 });
});

module.exports = router;
