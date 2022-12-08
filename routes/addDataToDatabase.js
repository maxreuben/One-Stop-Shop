const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { addDataService } = require("../services/addDataService");
const e = require("express");

app.post("/add-data", urlencodedParser, async function (request, response) {
  data = request.body;

  let res;

  if (data.secretKey == process.env.ADD_DATA_KEY) {
    res = await addDataService();
  } else {
    res = { message: "Invalid Secret Key" };
  }

  response.send(res);
});

module.exports = router;
