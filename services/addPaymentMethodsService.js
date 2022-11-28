const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { response } = require("express");

const { User } = require("../models/User");
const { PaymentMethod } = require("../models/PaymentMethod");

async function addPaymentMethodService(data, emailId) {
  console.log(data);
  let user = await User.findOne({
    where: {
      emailId: emailId,
    },
  });
  if (data.type == "Add") {
    let responseData;
    const paymentMethod = await PaymentMethod.create({
      cardNumber: data.cardNumber,
      expiryDate: data.expiryDate,
      cvv: data.cvv,
      cardType: data.cardType,
      UserId: data.userId,
    })
      .then(function (item) {
        responseData = {
          message: "Payment Method Created",
          status: 200,
          error: "",
          userObject: item,
        };
      })
      .catch(function (error) {
        console.log("ERROR", error);
        responseData = { message: "Error", status: 501, error: error.errors };
      });
  } else if (data.type == "Edit") {
    console.log("test", data.userId);
    let responseData;
    const paymentMethod = await PaymentMethod.update({
      cardNumber: data.cardNumber,
      expiryDate: data.expiryDate,
      cvv: data.cvv,
      cardType: data.cardType,
      UserId: data.userId,
    })
      .then(function (item) {
        responseData = {
          message: "Payment Method Created",
          status: 200,
          error: "",
          userObject: item,
        };
      })
      .catch(function (error) {
        console.log("ERROR", error);
        responseData = { message: "Error", status: 501, error: error.errors };
      });
  }
}

module.exports = { addPaymentMethodService };
