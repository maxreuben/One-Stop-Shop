const { searchProducts } = require("../services/searchService");
const express = require("express");
const router = express.Router();

app.get("/search", async (request, response) => {
  const products = await searchProducts({ ...request.query });
  response.json(products);
});

module.exports = router;
