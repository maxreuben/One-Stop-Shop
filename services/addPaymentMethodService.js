const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { response } = require("express");

const { User } = require("../models/User");
const { PaymentMethod } = require("../models/PaymentMethod");

async function addPaymentMethodService(data, emailId) {
  let responseData;

  if (data.type == "Add") {
    let user = await User.findOne({
      where: {
        emailId: emailId,
      },
    });
    //let responseData;

    const existingPaymentMethod = await PaymentMethod.findOne({
      where: {
        UserId: user.id,
        cardNumber: data.cardNumber,
      },
    });

    if (existingPaymentMethod != null) {
      responseData = {
        message: "Error, duplicate payment method exists",
        status: 501,
        error: "",
      };

      return responseData;
    }

    let type = 0;
    if (data.cardType === "Debit") {
      type = 1;
    } else if (data.cardType === "Credit") {
      type = 2;
    }
    const paymentMethod = await PaymentMethod.create({
      cardNumber: data.cardNumber,
      expiryDate: data.expiryDate,
      cvv: data.cvv,
      cardType: type,
      nameOnCard: data.nameOnCard,
      UserId: user.id,
    })
      .then(function (item) {
        console.log("NEW PAYMENT METHOD CREATED");
        responseData = {
          message: "New Payment Method Created",
          status: 200,
          error: "",
          paymentMethodObject: item,
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

  return responseData;
}

module.exports = { addPaymentMethodService };
