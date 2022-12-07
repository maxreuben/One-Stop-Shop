const { sequelize } = require("./Connection");
const Sequelize = require("sequelize");
const { User } = require("./User");
const { Product} = require("./Product");
const { Order } = require("./Order");
// const { User } = require("./models/User");

const ProductReview = sequelize.define("ProductReview",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
    
    review:{
        type : Sequelize.STRING,
    },
    rating:{
        type : Sequelize.FLOAT,
    },
    
   
})

User.hasOne(ProductReview);
Product.hasOne(ProductReview);
Order.hasOne(ProductReview);

ProductReview.sync();
module.exports = { ProductReview };
