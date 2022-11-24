const { sequelize } = require("./Connection");
const Sequelize = require("sequelize");

const Product = sequelize.define("Product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  retailPrice: {
    type: Sequelize.INTEGER,
  },
  discountedPrice: {
    type: Sequelize.INTEGER,
  },

  category: {
    type: Sequelize.STRING,
  },

  image: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },

  description: {
    type: Sequelize.STRING(1000),
  },

  specification: {
    type: Sequelize.JSON,
  },

  rating: {
    type: Sequelize.FLOAT,
  },

  brand: {
    type: Sequelize.STRING,
  },

  promotedToFrontPage: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Product.sync();

module.exports = { Product };
