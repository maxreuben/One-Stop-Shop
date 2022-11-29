const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { sendMail } = require("../services/email");
const cons = require("consolidate");
var cookieParser = require("cookie-parser");

app.post("/sendMail", urlencodedParser, async function (request, response) {
  let cookie = request.headers.cookie;

  var output = {};
  cookie.split(/\s*;\s*/).forEach(function (pair) {
    pair = pair.split(/\s*=\s*/);
    var name = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair.splice(1).join("="));
    output[name] = value;
  });

  console.log(output);

  let res = await sendMail(output.to, output.subject, output.text);

  response.send("");
});

module.exports = router;