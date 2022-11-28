const Sequelize = require("sequelize");

const { User } = require("../models/User");
const { Order } = require("../models/Order");


async function get_order_history(emailId) {
    let user = await User.findOne({
    where: {
      emailId: emailId,
    },
    });

    console.log(user);

    let orders = await Order.findAll({
    where: {
        UserId: user.id,
    },
    raw:true
    });

    return orders;
} 

module.exports = { get_order_history };