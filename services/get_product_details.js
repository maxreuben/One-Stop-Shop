const Sequelize = require("sequelize");

const { Product } = require("../models/Product");

async function get_product_details(productId) {
  let response = {};
  let product = await Product.findOne({
    limit: 10,
    where: {
      id: productId,
    },
  });

  if(product == undefined || product == null){

    response["error"] = "Product not found"

  }else{

    return product;

  }

  return  response;
}

module.exports = { get_product_details };
