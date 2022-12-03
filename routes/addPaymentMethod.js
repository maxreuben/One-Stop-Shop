const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {
  addPaymentMethodService,
} = require("../services/addPaymentMethodService");
const {
  get_payment_method_history,
} = require("../services/getUserPaymentMethodsService");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get(
  "/managePaymentMethod",
  urlencodedParser,
  async function (request, response) {
    let cookie = request.headers.cookie;

    var output = {};
    cookie.split(/\s*;\s*/).forEach(function (pair) {
      pair = pair.split(/\s*=\s*/);
      var name = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair.splice(1).join("="));
      output[name] = value;
    });

    let emailId = output.emailId;

    res = await get_payment_method_history(emailId);
    response.render("managePaymentMethod", { PaymentsHistory: res });
  }
);

app.post(
  "/add-payment-method",
  urlencodedParser,
  async function (request, response) {
    data = request.body;
    let cookie = request.headers.cookie;

    var output = {};
    cookie.split(/\s*;\s*/).forEach(function (pair) {
      pair = pair.split(/\s*=\s*/);
      var name = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair.splice(1).join("="));
      output[name] = value;
    });

    data.emailId = output.emailId;

    let res = await addPaymentMethodService(data, output.emailId);
    response.send(res);
  }
);

module.exports = router;
