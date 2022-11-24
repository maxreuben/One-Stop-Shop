const { sequelize } = require("./Connection");
const Sequelize = require("sequelize");

const ProductReview = sequelize.define("ProductReview",{
    productcomments:{
        type : Sequelize.STRING,
    },
    productrating:{
        type : Sequelize.INTEGER,
    },
    productcustomerImage :{
        type :Sequelize.BLOB,
    },
   
})
