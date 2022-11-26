// const { application } = require("express");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { loginService } = require("../services/loginService");
const {
  get_logged_user_service,
} = require("../services/get_current_user_details");
// const session = require("express-session");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// const signupService = require("../services/signupService").signupService;

app.get("/profile", urlencodedParser, async function (request, response) {
  data = request.body;
  // console.log(request);

  let cookie = request.headers.cookie;

  var output = {};
  cookie.split(/\s*;\s*/).forEach(function (pair) {
    pair = pair.split(/\s*=\s*/);
    var name = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair.splice(1).join("="));
    output[name] = value;
  });

  console.log(output);

  let emailId = output.emailId;

  let res = await get_logged_user_service(emailId);

  // userDetails

  response.render("profile.ejs", { userDetails: res });
});

module.exports = router;
