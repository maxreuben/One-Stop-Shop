const express = require("express");
const router = express.Router();

app.get("/shop", async function (request, response) {
  response.render("shop");
});

module.exports = router;
