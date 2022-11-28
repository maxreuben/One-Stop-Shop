const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {
  addPaymentMethodService,
} = require("../services/addPaymentMethodsService");
const {
  get_payment_history,
} = require("../services/getUserPaymentMethodsService");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/managePayment", urlencodedParser, async function (request, response) {
  let cookie = request.headers.cookie;

  var output = {};
  cookie.split(/\s*;\s*/).forEach(function (pair) {
    pair = pair.split(/\s*=\s*/);
    var name = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair.splice(1).join("="));
    output[name] = value;
  });

  let emailId = output.emailId;

  res = await get_payment_history(emailId);
  response.render("managePayment", { PaymentsHistory: res });
});

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

    console.log(output);
    data.emailId = output.emailId;

    let res = await addPaymentMethodService(data, emailId);
    response.send(res);
  }
);

module.exports = router;
