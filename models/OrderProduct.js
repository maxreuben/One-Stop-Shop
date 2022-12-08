const { User } = require("./User");
const { sequelize } = require("./Connection");
const Sequelize = require("sequelize");

const { Product } = require("./Product");
const { Order } = require("./Order");

const OrderProduct = sequelize.define("OrderProduct", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },

  quantity: {
    type: Sequelize.INTEGER,
  },
});

Product.hasOne(OrderProduct);
Order.hasOne(OrderProduct);
OrderProduct.sync();

module.exports = { OrderProduct };
