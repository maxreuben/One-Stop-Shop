const Sequelize = require("sequelize");

const { Product } = require("../models/Product");

async function get_product_service() {
  let response = {};
  let clothing = await Product.findAll({
    limit: 10,
    where: {
      category: "Clothing",
    },
  });

  let furniture = await Product.findAll({
    limit: 10,
    where: {
      category: "Furniture",
    },
  });

  let footwear = await Product.findAll({
    limit: 10,
    where: {
      category: "Footwear",
    },
  });

  let jewel = await Product.findAll({
    limit: 10,
    where: {
      category: "Jewellery",
    },
  });

  const clofur = clothing.concat(furniture);
  const foojel = footwear.concat(jewel);
  const products = clofur.concat(foojel);

  return await products;
}

module.exports = { get_product_service };
