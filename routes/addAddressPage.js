// const { application } = require("express");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
//const { loginService } = require("../services/loginService");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// const signupService = require("../services/signupService").signupService;
//const { get_address_details } = require("../services/getAddressDetails");

const url = require('url');


app.get("/addAddress", urlencodedParser, async function (request, response) {

    //const { addressId } = request.params;
  //data = request.body;
  console.log("inside add adress");

  //console.log("url--" + request.url);

  //let addressId = url.parse(request.url, true).query;

  //console.log("address id--", addressId);

  //let res = await get_address_details(addressId);

  //console.log("res--", res);

  response.render("addAddress");

});

module.exports = router;