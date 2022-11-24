// const { application } = require("express");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {
  editPaymentMethodService,
} = require("../services/editPaymentMethodService");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// const signupService = require("../services/signupService").signupService;

app.get("/addPaymentMethod", urlencodedParser, function (request, response) {
  data = request.body;
  // console.log(request);

  response.render("addPaymentMethod.html");
});

app.post(
  "/add-payment-method",
  urlencodedParser,
  async function (request, response) {
    data = request.body;
    data.userId = request.session.userId;

    let res = await editPaymentMethodService(data);

    // response.status(200);
    response.send(res);
  }
);

module.exports = router;
