const Sequelize = require("sequelize");

const { Product } = require("../models/Product");

async function get_product_service() {
    let product = await Product.findAll({
        where: {
            promotedToFrontPage: true,
        },
    });
    return product;
} 

module.exports = { get_product_service };