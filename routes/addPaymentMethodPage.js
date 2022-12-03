const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const url = require("url");

app.get(
  "/addPaymentMethod",
  urlencodedParser,
  async function (request, response) {
    response.render("addPaymentMethod");
  }
);

module.exports = router;
