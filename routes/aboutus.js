// const { application } = require("express");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// const signupService = require("../services/signupService").signupService;

app.get("/aboutus", urlencodedParser, async function (request, response) {
  response.render("aboutus");
});

module.exports = router;
