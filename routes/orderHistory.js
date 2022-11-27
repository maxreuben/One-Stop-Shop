// const { application } = require("express");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { loginService } = require("../services/loginService");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// const signupService = require("../services/signupService").signupService;
const { get_product_details } = require("../services/get_product_details");
const url = require('url');


app.get("/orderHistory", urlencodedParser, async function (request, response) {

  response.render("orderHistory");
  
});

module.exports = router;
