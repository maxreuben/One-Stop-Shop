const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { application } = require("express");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const { getCookies } = require("../services/getCookies");
const {
  getUserCart,
  addToCart,
  removeProductFromCart,
  updateProductQuantity,
} = require("../services/cartServices");

app.get("/getUserCart", async function (request, response) {
  let cookies = getCookies(request);

  let resp;

  if (cookies.emailId == undefined) {
    resp = { status: 401, message: "User Not Logged In" };

    // response.send(resp);
  } else {
    resp = await getUserCart(cookies.emailId);

    resp["status"] = 200;
  }
  response.send(resp);
});

app.post("/addToCart", urlencodedParser, async function (request, response) {
  let cookies = getCookies(request);
  let resp;

  if (cookies.emailId == undefined) {
    resp = { status: 401, message: "User Not Logged In" };

    // response.send(resp);
  } else {
    resp = await addToCart(
      cookies.emailId,
      request.body.productId,
      request.body.quantity
    );
  }

  response.send(resp);
});

app.post(
  "/removeProduct",
  urlencodedParser,
  async function (request, response) {
    let cookies = getCookies(request);
    let resp;

    if (cookies.emailId == undefined) {
      resp = { status: 401, message: "User Not Logged In" };
    }

    let productId = request.body.productId;
    let emailId = cookies.emailId;

    console.log(productId, emailId);

    if (productId != undefined) {
      let res = await removeProductFromCart(emailId, productId);
    }

    response.send({ status: 200 });
  }
);

app.post(
  "/updateProductQuantity",
  urlencodedParser,
  async function (request, response) {
    let cookies = getCookies(request);
    let resp;

    if (cookies.emailId == undefined) {
      resp = { status: 401, message: "User Not Logged In" };
    }

    let productId = request.body.productId;
    let emailId = cookies.emailId;
    let quantity = request.body.quantity;

    if (productId != undefined) {
      let res = await updateProductQuantity(emailId, productId, quantity);
    }

    response.send({ status: 200 });
  }
);

module.exports = router;
