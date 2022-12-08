const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get("/thanks", urlencodedParser, async function (request, response) {
    response.render("thanks.ejs");
  }
);


module.exports = router;