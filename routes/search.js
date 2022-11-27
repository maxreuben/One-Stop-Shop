const { searchProducts } = require("../services/searchService");
const express = require("express");
const router = express.Router();

app.get("/search", async (request, response) => {
  try {
    const products = await searchProducts({ ...request.query });
    response.json(products);
  } catch (e) {
    console.error(e);
    response.statusCode = 503;
  }
});

module.exports = router;
