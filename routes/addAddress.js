const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { addAddressService } = require("../services/addAddressService");
const { get_address_history } = require("../services/getUserAddressService");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/manageAddress", urlencodedParser, async function (request, response) {
  let cookie = request.headers.cookie;

  var output = {};
  cookie.split(/\s*;\s*/).forEach(function (pair) {
    pair = pair.split(/\s*=\s*/);
    var name = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair.splice(1).join("="));
    output[name] = value;
  });

  let emailId = output.emailId;

  res = await get_address_history(emailId);
  response.render("manageAddress", { AddressHistory: res });
});

app.post("/add-address", urlencodedParser, async function (request, response) {
  data = request.body;
  let cookie = request.headers.cookie;

  console.log("request -add address-", request.body);

  console.log("request -cookie-", cookie);

  var output = {};
  cookie.split(/\s*;\s*/).forEach(function (pair) {
    pair = pair.split(/\s*=\s*/);
    var name = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair.splice(1).join("="));
    output[name] = value;
  });

  console.log(output);
  data.emailId = output.emailId;

  let res = await addAddressService(data, output.emailId);
  response.send(res);
});

module.exports = router;
