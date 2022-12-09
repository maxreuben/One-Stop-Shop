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
const {
  getUserCart,
  addToCart,
  removeProductFromCart,
  updateProductQuantity,
} = require("../services/cartServices");

app.post("/checkout", urlencodedParser, async function (request, response) {
  let cookie = request.headers.cookie;

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

  if(data.isNewAddress == 'true') {
    let responseData = await addAddressService(data, output.emailId);
    addressId = responseData.addressObject.id;
  } else {
    addressId = data.addressId;
  }

  if(data.isNewPaymentMethod == 'true') {
    let responseData = await addPaymentMethodService(data, output.emailId);
    paymentMethodId = responseData.paymentMethodObject.id;
  } else {
    paymentMethodId = data.paymentId;
  }

  let cart = await getUserCart(output.emailId);

  var totalPrice = 0;
  
  cart.map((product) => {
    totalPrice = totalPrice + (product.quantity * product.productDetails.retailPrice);
  })

  let res = await checkout(cart, totalPrice, output.emailId, addressId, paymentMethodId);

  response.send(res);
});

module.exports = router;
