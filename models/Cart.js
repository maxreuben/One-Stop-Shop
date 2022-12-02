const { sequelize } = require("./Connection");
const Sequelize = require("sequelize");
const { User } = require("./User");

const Cart = sequelize.define("Cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },

  cart: {
    type: Sequelize.JSON,
  },
});

User.hasOne(Cart);

Cart.sync();

module.exports = { Cart };
