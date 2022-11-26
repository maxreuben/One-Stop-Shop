// const { application } = require("express");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// const signupService = require("../services/signupService").signupService;

app.get("/", urlencodedParser, async function (request, response) {
  response.render("home", {
    categories: ["Jewellery", "Furniture", "Clothing", "Footwear"],
  });
});

module.exports = router;
