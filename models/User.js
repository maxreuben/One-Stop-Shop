const { sequelize } = require("./Connection");
const Sequelize = require("sequelize");

const User = sequelize.define("User", {
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

  emailId: {
    type: Sequelize.STRING,
    unique: true,
  },

  password: {
    type: Sequelize.STRING,
  },

  role: {
    type: Sequelize.INTEGER,
  },

  token: {
    type: Sequelize.STRING,
  },

  phoneNumber: {
    type: Sequelize.STRING,
  },
});

User.sync();

module.exports = { User };
