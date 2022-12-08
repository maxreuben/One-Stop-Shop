const {
    searchProducts,
    getTopOccurrences,
  } = require("../services/searchService");
  const { get_address_history } = require("../services/getUserAddressService");
  const {
    addPaymentMethodService,
  } = require("../services/addPaymentMethodService");
  const {
    get_payment_method_history,
  } = require("../services/getUserPaymentMethodsService");
  const express = require("express");
  const router = express.Router();
  
  app.get("/getCheckoutDetails", async (request, response) => {

    try {

      var emailID = request.query.emailID;

      const addresses = await get_address_history(emailID);

      response.json(addresses);
    } catch (e) {
      console.error(e);
      response.statusCode = 503;
      response.send();
    }
  });

  app.get("/getPaymentDetails", async (request, response) => {

    console.log("inside pymt--");

    try {

      var emailID = request.query.emailID;

      const paymentMethods = await get_payment_method_history(emailID);

      response.json(paymentMethods);

    } catch (e) {
      console.error(e);
      response.statusCode = 503;
      response.send();
    }
  });

  app.get("/getCartDetails", async (request, response) => {

    console.log("inside cart--");

    try {

      var emailID = request.query.emailID;

      const paymentMethods = await get_payment_method_history(emailID);

      response.json(paymentMethods);

    } catch (e) {
      console.error(e);
      response.statusCode = 503;
      response.send();
    }
  });
  
  module.exports = router;
  