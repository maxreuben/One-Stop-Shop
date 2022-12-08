const Sequelize = require("sequelize");

const { User } = require("../models/User");
const { Order } = require("../models/Order");
const { OrderProduct } = require("../models/OrderProduct");
const { Product } = require("../models/Product");
const { get_product_details } = require("../services/get_product_details");



async function get_order_details(order_id) {

    console.log("orderId--", order_id);

    let orderDetails = await OrderProduct.findAll({
    where: {
        OrderId: order_id,
    },
    raw:true
    });

    // var products = new Array();

    // for(var i = 0; i < orderDetails.length; i++){

    //     var productID = orderDetails[i].ProductId;

    //     let product = get_product_details(productID);

    //     products.push(product);

    // }

    console.log("orderDetails--", orderDetails);

    return orderDetails;
} 

module.exports = { get_order_details };