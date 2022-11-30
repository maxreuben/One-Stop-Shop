const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { response } = require("express");

const { User } = require("../models/User");
const { Address } = require("../models/Address");

async function addAddressService(data, emailId) {
  console.log(data);

  let user = await Address.findOne({
    where: {
      emailId: emailId,
    },
  });
  if (data.type == "Add") {
    let responseData;
    const address = await Address.create({
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      zipcode: data.zipcode,
      UserId: user.id,
    })
      .then(function (item) {
        responseData = {
          message: "New Address Created",
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
    let responseData;
    const address = await Address.update(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipcode: data.zipcode,
      },
      {
        where: {
          id: addressId,
        },
      }
    )
      .then(function (item) {
        responseData = {
          message: "Address Updated",
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

module.exports = { addAddressService };
