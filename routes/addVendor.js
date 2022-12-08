const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {
  get_logged_user_service,
} = require("../services/get_current_user_details");
const { vendorRegistrationRequest } = require("../services/vendorRegistrationRequest");

app.get("/addVendor", urlencodedParser, async function (request, response) {
    data = request.body
    response.render("addVendor.ejs");
  }
);

app.post("/addVendor", urlencodedParser, function (request, response) {
  data = request.body;
  // console.log(request);
  console.log("enetered to the postmethod");

  console.log(data);

  // let responseData = await signupService(data);

  vendorRegistrationRequest(data)
    .then(function (responseData) {
      // await responseData;
      
      response.status = responseData.status;
     
      response.send(JSON.stringify(responseData));
      // response.render("thanks");
    })
    .catch(function (error) {
      response.status = 404;
     
      response.send(JSON.stringify({ Response: "Error", error: error }));
    });
    //response.render("thanks.ejs")
});



module.exports = router;