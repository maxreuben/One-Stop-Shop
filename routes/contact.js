const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {
  get_logged_user_service,
} = require("../services/get_current_user_details");

app.get("/contactus", urlencodedParser, async function (request, response) {
  let cookie = request.headers.cookie;
  if (cookie == null) {
    

    response.render("contact",{email_value: ""});

  }
  else {
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

  response.render("contact", { email_value: res['emailId'] });

  }

  
});

module.exports = router;
