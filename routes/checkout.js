const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { checkout } = require("../services/checkout_service");
const cons = require("consolidate");
var cookieParser = require("cookie-parser");
const { addAddressService } = require("../services/addAddressService");
const { addPaymentMethodService } = require("../services/addPaymentMethodService");

app.post("/checkout", urlencodedParser, async function (request, response) {
  let cookie = request.headers.cookie;

  console.log("inside cab--")

  var output = {};
  cookie.split(/\s*;\s*/).forEach(function (pair) {
    pair = pair.split(/\s*=\s*/);
    var name = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair.splice(1).join("="));
    output[name] = value;
  });

  console.log(output);


  let addressId;

  let paymentMethodId;

  let data = request.body;

  console.log("body---12--", data);

  console.log("data.address---", JSON.stringify(data.address));

  //console.log("data.address---", data[address]);
  console.log("data.address---", JSON.stringify(data['address']));
  //console.log("data.address---", data.get(address));

  console.log("data.paymentMethod---", data.paymentMethod);

  if(data.isNewAddress == 'true') {
    let addressobj = await addAddressService(data.address, output.emailId);
    addressId = addressobj.addressObject.id;
  } else {
    addressId = data.address.id;
  }

  if(data.isNewPaymentMethod == 'true') {
    let paymentobj = await addPaymentMethodService(data.paymentMethod, output.emailId);
    paymentMethodId = paymentobj.paymentMethodObject.id;
  } else {
    paymentMethodId = data.paymentMethod.id;
  }

  let res = await checkout(output.cart, output.emailId, addressId, paymentMethodId);

  response.send("");
});

module.exports = router;
