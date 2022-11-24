const sequelize = require("./Connection").sequelize;
const { User } = require("./User");

const Address = sequelize.define("Address", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },

  line1: {
    type: Sequelize.STRING,
  },

  line2: {
    type: Sequelize.STRING,
  },

  city: {
    type: Sequelize.STRING,
    unique: true,
  },

  state: {
    type: Sequelize.STRING,
  },

  country: {
    type: Sequelize.INTEGER,
  },

  zipcode: {
    type: Sequelize.STRING,
  },
});

User.hasOne(Address);

Address.sync();

module.exports = { Address };
