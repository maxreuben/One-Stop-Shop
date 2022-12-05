const Sequelize = require("sequelize");

const { PaymentMethod } = require("../models/PaymentMethod");

async function get_payment_method_details(paymentId) {
  let paymentMethod = await PaymentMethod.findOne({
    where: {
      id: paymentId,
    },
  });

  console.log(paymentMethod);

  return paymentMethod;
}

module.exports = { get_payment_method_details };
