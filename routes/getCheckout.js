const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { addAddressService } = require("../services/addAddressService");
const { get_address_history } = require("../services/getUserAddressService");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {
  getUserCart,
} = require("../services/cartServices");

app.get("/checkout", urlencodedParser, async function (request, response) {
  let cookie = request.headers.cookie;

  var output = {};
  cookie.split(/\s*;\s*/).forEach(function (pair) {
    pair = pair.split(/\s*=\s*/);
    var name = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair.splice(1).join("="));
    output[name] = value;
  });

  let emailId = output.emailId;

  //console.log(output);

  res = await getUserCart(emailId);

  console.log("cart Details --", res);

  response.render("checkout", { CartDetails: res });
});

module.exports = router;
