const Sequelize = require("sequelize");

const { User } = require("../models/User");

async function get_logged_user_service(emailId) {
    let user = await User.findOne({
    where: {
      emailId: emailId,
    },
    });

    console.log(user);

  return user;
} 

module.exports = { get_logged_user_service };