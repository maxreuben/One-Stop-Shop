const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { sendMail } = require("../services/email");

app.get("/forgotPassword", urlencodedParser, async function (request, response) {
    response.render("forgotPassword");
});

app.post("/forgotPassword", urlencodedParser, async function(request, response){
    let emailId = request.body.emailId;
    let res = sendMail(emailId, "testSubject", "testBody");
})

module.exports = router;