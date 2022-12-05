const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const crypto = require('crypto');
const path = require('path');
const { User } = require("../models/User");
const bcrypt = require("bcrypt")

app.get("/resetPassword", urlencodedParser, async function (request, response) {
    const emailId = request.query.email
    const hash = request.query.hash
    if (request.query && emailId && hash) {
        let user = await User.findOne({
            where: {
              emailId: emailId,
            },
        });
        if (user) {
            const linkEmailHash = crypto.createHash('sha512').update(emailId).digest('hex');
            if (linkEmailHash == hash) {
                return response.render("resetPassword");
            } else {
                return response.status(400).json({
                    message: "You have provided an invalid reset link"
                })
            }
        } else {
            return response.status(400).json({
                message: "Sorry this user is not registered with One Stop Shop"
            })
        }
    } else {
        let redirectPath = path.format({
            root: __dirname,
            dir: "../views",
            base: "forgotPassword.ejs",
        });
        // path.join(__dirname, '..', 'views', 'forgotPassword.ejs')
        return response.render(redirectPath)
    }
});

app.post("/resetPassword", urlencodedParser, async function (request, response) {
    console.log(request.body.password)
    let encryptedPassword = bcrypt.hashSync(request.body.password, 10);
    let responseData;
    let user = await User.update(
        {
          password: password,
        },
        {
          where: {
            emailId: request.body.emailId,
          },
        }
      )
      .then(function (item) {
          responseData = {
            message: "Password Updated",
            status: 200,
            error: "",
            userObject: item,
          };
        })
        .catch(function (error) {
          responseData = {
            message: "Error in updating password service",
            status: 400,
            error: error,
          };
        });
        return responseData;
});

module.exports = router;