const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { modifyUserService } = require("../services/modifyUserService");

app.post("/modifyUser", urlencodedParser, function (request, response) {
  data = request.body;
  let cookie = request.headers.cookie;

  var output = {};
  cookie.split(/\s*;\s*/).forEach(function (pair) {
    pair = pair.split(/\s*=\s*/);
    var name = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair.splice(1).join("="));
    output[name] = value;
  });

  console.log(output);

  data.emailid = output.emailId;

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
