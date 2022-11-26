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


app.get("/productPage", urlencodedParser, async function (request, response) {
  data = request.body;
  // console.log(request);

  console.log("url--" + request.url);

  let productId = url.parse(request.url, true).query;

  console.log("product id--", productId.productId);

  let res = await get_product_details(productId.productId);

  console.log("res--", res);

  response.render("productPage", { productDetails: res });
});

module.exports = router;
