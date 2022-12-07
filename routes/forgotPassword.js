const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { sendMail } = require("../services/email");
const crypto = require("crypto")
const { User } = require("../models/User");

app.get("/forgotPassword", urlencodedParser, async function (request, response) {
    response.render("forgotPassword");
  }
);

app.post("/forgotPassword", urlencodedParser, async function (request, response) {
    let emailId = request.body.emailId;
    let user = await User.findOne({
      where: {
        emailId: emailId,
      },
    });
  if(user){
      console.log("Verified user")
      const hash = crypto.createHash('sha512').update(emailId).digest('hex');
      const resetLink = `http://localhost:5001/resetPassword?email=${emailId}&hash=${hash}`
      const body = `Dear ${emailId},\n Please use the following link to reset your password. \n ${resetLink}`
      console.log(resetLink);
      let res = sendMail(emailId, "Password Reset Link", body);
      return response.status(200).json({
          resetLink
      })
  }
  }
);

module.exports = router;
