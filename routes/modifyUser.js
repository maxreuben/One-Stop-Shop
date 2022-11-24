const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { modifyUserService } = require("../services/modifyUserService");

app.post("/modifyUser", urlencodedParser, function (request, response) {
  data = request.body;
  // console.log(data.username);
  data.emailId = request.session.emailid;

  modifyUserService(data)
    .then(function (responseData) {
      // await responseData;
      console.log("RESPONSE DATA", responseData);
      response.status = responseData.status;
      response.send(JSON.stringify(responseData));
    })
    .catch(function (error) {
      response.status = 400;
      response.send(JSON.stringify({ Response: "Error", error: error }));
    });
});

module.exports = router;
