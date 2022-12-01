const Sequelize = require("sequelize");

const { User } = require("../models/User");
const { Address } = require("../models/Address");

async function get_address_history(emailId) {
  let user = await User.findOne({
    where: {
      emailId: emailId,
    },
  });

  console.log(user);

  let address = await Address.findAll({
    where: {
      UserId: user.id,
    },
  });

  console.log("address --- ", address);

  return address;
}

module.exports = { get_address_history };
