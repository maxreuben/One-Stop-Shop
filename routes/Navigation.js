// const { application } = require("express");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const signupService = require("../services/signupService").signupService;

app.get("/NavigationBar", urlencodedParser, function (request, response) {
  data = request.body;
  response.render("NavigationBar.html");
});

module.exports = router;
