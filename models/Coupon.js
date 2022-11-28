const { sequelize } = require("./Connection");
const Sequelize = require("sequelize");

const Coupons = sequelize.define("Coupons", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  coupon: {
    type: Sequelize.STRING,
  },
  couponValue: {
    type: Sequelize.INTEGER,
  },
});
