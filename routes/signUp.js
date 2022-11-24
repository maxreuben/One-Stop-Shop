// const { application } = require("express");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const signupService = require("../services/signupService").signupService;

app.get("/signup", urlencodedParser, function (request, response) {
  data = request.body;
  response.render("signin.html");
});

app.post("/signup", urlencodedParser, function (request, response) {
  data = request.body;
  // console.log(request);

  console.log(data);

  // let responseData = await signupService(data);

  signupService(data)
    .then(function (responseData) {
      // await responseData;
      console.log("RESPONSE DATA", responseData);
      response.status = responseData.status;
      response.send(JSON.stringify(responseData));
    })
    .catch(function (error) {
      response.status = 404;
      response.send(JSON.stringify({ Response: "Error", error: error }));
    });
});

module.exports = router;
