const { sequelize } = require("./Connection");
const Sequelize = require("sequelize");

const ProductReview = sequelize.define("ProductReview",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
    userid:{
        type: Sequelize.STRING,
    },
    productId:{
        type:Sequelize.INTEGER,
    },
    productcomments:{
        type : Sequelize.STRING,
    },
    productrating:{
        type : Sequelize.FLOAT,
    },
    productcustomerImage :{
        type :Sequelize.BLOB,
    },
   
})

ProductReview.sync();
module.exports = { ProductReview };
