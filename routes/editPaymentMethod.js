const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { loginService } = require("../services/loginService");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {
  get_payment_method_details,
} = require("../services/getPaymentMethodDetails");

const url = require("url");

app.get("/editPaymentMethod/:paymentId",urlencodedParser,async function (request, response) {
    const { paymentId } = request.params;
    data = request.body;

    let res = await get_payment_method_details(paymentId);

    response.render("editPaymentMethod", { PaymentMethod: res });
  }
);

module.exports = router;
