const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {get_logged_user_service} = require("../services/get_current_user_details");


app.get("/get-logged-user", urlencodedParser, async function (request, response) {

    console.log("Cookies", request.cookies)

    emailId = request.session.emailid;

    console.log("EmailId", emailId)
    if(emailId == null || emailId == undefined){
        response.send({"status": 401, "message": "User not logged In"})
    }
    else{
        let res;

        res = await get_logged_user_service(emailId);
    
        response.send(res);
    }



});

module.exports = router;
