// const { application } = require("express");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { loginService } = require("../services/loginService");
// const session = require("express-session");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// const signupService = require("../services/signupService").signupService;

app.get("/cart", urlencodedParser, function (request, response) {
  data = request.body;
  // console.log(request);

  response.render("cart.ejs");
});


module.exports = router;
