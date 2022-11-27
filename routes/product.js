const express = require("express");
const { getProduct } = require("../services/searchService");
const router = express.Router();

app.get("/product/:productId", async (request, response) => {
  const { productId } = request.params;
  if (!productId) {
    response.statusCode = 400;
    response.statusText = "Empty productId";
    response.send();
    return;
  }
  try {
    const product = await getProduct(productId);
    console.log(JSON.stringify(product));
    response.render("product", { productDetails: { ...product, rating: 2.5 } });
  } catch (e) {
    console.error(e);
    response.statusCode = 404;
    response.statusText = "No product with id " + productId;
  }
});

module.exports = router;
