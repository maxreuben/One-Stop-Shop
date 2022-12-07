const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/aboutus", urlencodedParser, async function (request, response) {
  response.render("aboutus");
});

module.exports = router;
