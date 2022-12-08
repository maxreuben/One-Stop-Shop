const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { loginService } = require("../services/loginService");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { get_order_history } = require("../services/get_order_history");
const url = require("url");
const { getCookies } = require("../services/getCookies");

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
  "/orderDetails:orderId",
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
  }
);

module.exports = router;
