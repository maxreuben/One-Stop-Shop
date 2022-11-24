// const { application } = require("express");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// const signupService = require("../services/signupService").signupService;
const { addDataService } = require("../services/addDataService");
const e = require("express");

app.post("/add-data", urlencodedParser, async function (request, response) {
  data = request.body;

  let res;

  console.log(data.secretKey, process.env.ADD_DATA_KEY);

  if (data.secretKey == process.env.ADD_DATA_KEY) {
    res = await addDataService();
  } else {
    res = { message: "Invalid Secret Key" };
  }

  // response.status(200);
  response.send(res);
});

module.exports = router;
