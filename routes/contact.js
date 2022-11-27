const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/contactus", urlencodedParser, async function (request, response) {
  response.render("contact");
});

module.exports = router;
