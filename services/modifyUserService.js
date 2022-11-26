const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { response } = require("express");

const { User } = require("../models/User");

async function modifyUserService(data) {
  console.log("Reached in modifyUserService", data.emailId);
  let encryptedPassword = bcrypt.hashSync(data.password, 10);
  let responseData;
  let user = await User.findOne({
    where: {
      emailId: data.emailId,
    },
  })
    .then(async function (foundUser) {
      console.log("TESTING");
      console.log(foundUser);
      if (foundUser == null) response = { status: 404 };

      user = await User.update(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          password: encryptedPassword,
          phoneNumber: data.phoneNumber,
        },
        {
          where: {
            emailId: foundUser.emailId,
          },
        }
      )
        .then(function (item) {
          responseData = {
            message: "User Updated",
            status: 200,
            error: "",
            userObject: item,
          };
        })
        .catch(function (error) {
          responseData = {
            message: "Error in service",
            status: 400,
            error: error,
          };
        });
    })
    .catch(function (error) {
      console.log("FROM ERROR");
      console.log(error);
    });

  return responseData;
}

module.exports = { modifyUserService };
