const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Product } = require("../models/Product");

async function search_product(query) {
    let prod = await Product.findAll({
    where: {
        name: {
            [Op.iLike]: '%' + query + '%'
          }
    },
    });

    //console.log(prod);

  return prod;
} 

module.exports = { search_product };