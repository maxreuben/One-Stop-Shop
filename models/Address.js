const { sequelize } = require("./Connection");
const Sequelize = require("sequelize");
const { User } = require("./User");

const Address = sequelize.define("Address", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },

  firstName: {
    type: Sequelize.STRING,
  },

  lastName: {
    type: Sequelize.STRING,
  },

  address: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },

  city: {
    type: Sequelize.STRING,
  },

  state: {
    type: Sequelize.STRING,
  },

  country: {
    type: Sequelize.STRING,
  },

  zipcode: {
    type: Sequelize.STRING,
  },
});

User.hasOne(Address);

Address.sync();

module.exports = { Address };
