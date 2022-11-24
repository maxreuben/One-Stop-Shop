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
    response["Clothing"] = clothing;

    let Furniture = await Product.findAll({
        limit: 10,
        where: {
            category: "Furniture",
        },
    });
    response["Furniture"] = Furniture;

    let Footwear = await Product.findAll({
        limit: 10,
        where: {
            category: "Footwear",
        },
    });
    response["Footwear"] = Footwear;

    let Jewellery = await Product.findAll({
        limit: 10,
        where: {
            category: "Jewellery",
        },
    });
    response["Jewellery"] = Jewellery;


    return await response;
} 

module.exports = { get_product_service };