const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { response } = require("express");

const { User } = require("../models/User");
// var { session } = require("../models/Session");

async function loginService(username, password) {
  let response;
  let user = await User.findOne({
    where: {
      emailId: username,
    },
  });

  // console.log(user);
  if (user == null) response = { status: 404 };
  else {
    let passwordCompare = bcrypt.compareSync(password, user.password);
    console.log("PASSWORD COMPARE", passwordCompare)

    if (passwordCompare) {
      //   session.userId = user.userId;
      //   session.emailId = user.emailId;
      response = { status: 200, userObject: user };
    } else {
      response = { status: 401 };
    }
  }

  return response;
}

module.exports = { loginService };
