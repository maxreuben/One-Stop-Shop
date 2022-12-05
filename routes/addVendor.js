const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {
  get_logged_user_service,
} = require("../services/get_current_user_details");

app.get("/addVendor", urlencodedParser, async function (request, response) {
    data = request.body
    response.render("addVendor.ejs");
  }
);

module.exports = router;