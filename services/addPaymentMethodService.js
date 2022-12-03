const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { response } = require("express");

const { User } = require("../models/User");
const { PaymentMethod } = require("../models/PaymentMethod");

async function addPaymentMethodService(data, emailId) {
  if (data.type == "Add") {
    let user = await User.findOne({
      where: {
        emailId: emailId,
      },
    });
    let responseData;
    const paymentMethod = await PaymentMethod.create({
      cardNumber: data.cardNumber,
      expiryDate: data.expiryDate,
      cvv: data.cvv,
      cardType: data.cardType,
      UserId: user.id,
    })
      .then(function (item) {
        responseData = {
          message: "New Payment Method Created",
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
    const paymentMethod = await PaymentMethod.update(
      {
        cardNumber: data.cardNumber,
        expiryDate: data.expiryDate,
        cvv: data.cvv,
        cardType: data.cardType,
      },
      {
        where: {
          id: data.paymentId,
        },
      }
    )
      .then(function (item) {
        responseData = {
          message: "Payment Method Updated",
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
