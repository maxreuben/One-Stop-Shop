const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { loginService } = require("../services/loginService");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { get_order_history } = require("../services/get_order_history");
const url = require("url");
const { getCookies } = require("../services/getCookies");
const { get_order_details } = require("../services/get_order_details");
const { get_product_details } = require("../services/get_product_details");


app.get("/orderHistory", urlencodedParser, async function (request, response) {
  let cookie = request.headers.cookie;

  var output = {};
  cookie.split(/\s*;\s*/).forEach(function (pair) {
    pair = pair.split(/\s*=\s*/);
    var name = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair.splice(1).join("="));
    output[name] = value;
  });

  let emailId = output.emailId;

  res = await get_order_history(emailId);

  console.log("orders--", res);

  response.render("orderHistory", { orderHistory: res });
});

app.get(
  "/orderDetails/:orderId",
  urlencodedParser,
  async function (request, response) {
    let cookie = getCookies(request);

    if (cookie.emailId == undefined || cookie.emailId == "") {
      response.send(
        JSON.stringify({
          status: 501,
          message: "User not logged in",
        })
      );
    }

    const { orderId } = request.params;

    res = await get_order_details(orderId);

    var products = new Array();

    for(var i = 0; i < res.length; i++){

        var productID = res[i].ProductId;

        let product = await get_product_details(productID);

        products.push(product);

    }

    console.log("products-products-", products);

    console.log("orders-123-", res);

    response.render("orderHistoryDetails", {orderDetails: res, ProductDetails: products});


  }
);

module.exports = router;
