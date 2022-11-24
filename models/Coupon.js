const { sequelize } = require("./Connection");
const Sequelize = require("sequelize");

const Coupons = sequelize.define("Coupons", {
  coupons: {
    type: Sequelize.STRING,
  },
  cuoponValue: {
    type: Sequelize.INTEGER,
  },
});
