// const { application } = require("express");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { loginService } = require("../services/loginService");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// const signupService = require("../services/signupService").signupService;

app.get("/", urlencodedParser, function (request, response) {
  data = request.body;
  // console.log(request);


  response.render("home.html")


});

// app.post("/signin", urlencodedParser, async function (request, response) {

//     data = request.body
//     username = data.emailId
//     password = data.password

//     let checkUser  = await loginService(username, password);

//     console.log("POST TEST");
//     console.log(username, password);


//     // response.status(200);
//     response.send(checkUser);


// });

module.exports = router;
