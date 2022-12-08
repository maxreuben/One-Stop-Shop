const { sequelize } = require("./Connection");
const Sequelize = require("sequelize");

const VendorRegistrationRequest = sequelize.define("VendorRegistrationRequest", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  
  firstname: {
    type: Sequelize.STRING,
  },

  lastName: {
    type: Sequelize.STRING,
  },

  emailId: {
    type: Sequelize.STRING,
    unique: true,
  },

  company: {
    type: Sequelize.STRING,
  },

  BusinessLicenseNumber: {
    type: Sequelize.STRING,
  },
  status:{
    type:Sequelize.INTEGER,
    default: 0
  },

  phoneNumber: {
    type: Sequelize.STRING,
  },
});

VendorRegistrationRequest.sync();

module.exports = { VendorRegistrationRequest };
