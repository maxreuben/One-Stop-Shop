const Sequelize = require("sequelize");

const { Address } = require("../models/Address");

async function get_address_details(addressId) {
    let address = await Address.findOne({
    where: {
        id: addressId,
    },
    });

    console.log(address);

  return address;
} 

module.exports = { get_address_details };