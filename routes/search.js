const {
  searchProducts,
  getTopOccurrences,
} = require("../services/searchService");
const express = require("express");
const router = express.Router();

app.get("/search", async (request, response) => {
  try {
    const products = await searchProducts({ ...request.query });
    response.json(products);
  } catch (e) {
    console.error(e);
    response.statusCode = 503;
    response.send();
  }
});

app.get("/topValues", async (request, response) => {
  if (!request.query.column) {
    response.statusCode = 400;
    response.send();
  } else {
    const { column, count, ...params } = request.query;
    try {
      const counts = await getTopOccurrences(column, count ?? 5, params);
      response.json(counts);
    } catch (e) {
      console.error(e);
      response.statusCode = 503;
      response.send();
    }
  }
});

module.exports = router;
