const { sequelize } = require("./Connection");
const Sequelize = require("sequelize");

const { User } = require("./User");
const { Address } = require("./Address");
const { PaymentMethod } = require("./PaymentMethod");

const Order = sequelize.define("Order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  orderAmount: {
    type: Sequelize.INTEGER,
  },

  orderCreateDate: {
    type: Sequelize.DATE,
    default: Sequelize.NOW,
  },
});

User.hasOne(Order);

Address.hasOne(Order);

PaymentMethod.hasOne(Order);

Order.sync();

module.exports = { Order };
