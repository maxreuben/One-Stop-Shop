const Sequelize = require("sequelize");

const { User } = require("../models/User");
const { PaymentMethod } = require("../models/PaymentMethod");

async function get_payment_method_history(emailId) {
  let user = await User.findOne({
    where: {
      emailId: emailId,
    },
  });

  console.log(user);

  let paymentMethod = await PaymentMethod.findAll({
    where: {
      UserId: user.id,
    },
  });

  return paymentMethod;
}

module.exports = { get_payment_method_history };
