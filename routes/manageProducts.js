const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const { checkout } = require("../services/checkout_service");
const cons = require("consolidate");
var cookieParser = require("cookie-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
// const signupService = require("../services/signupService").signupService;

app.get("/manage-products", urlencodedParser, function (request, response) {
  data = request.body;
  // console.log(request);

  response.render("manageProducts");
});

module.exports = router;