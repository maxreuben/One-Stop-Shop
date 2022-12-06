const { sequelize } = require("./Connection");
const Sequelize = require("sequelize");

const { User } = require("./User");

const PaymentMethod = sequelize.define("PaymentMethod", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },

  cardNumber: {
    type: Sequelize.STRING,
  },

  expiryDate: {
    type: Sequelize.DATE,
  },

  cardType: {
    type: Sequelize.INTEGER,
  },

  cvv: {
    type: Sequelize.INTEGER,
  },
  nameOnCard: {
    type: Sequelize.STRING,
  },
});

User.hasOne(PaymentMethod);

PaymentMethod.sync();

module.exports = { PaymentMethod };
