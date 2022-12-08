const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { response } = require("express");


const { VendorRegistrationRequest } = require("../models/VendorRegistrationRequest");

async function vendorRegistrationRequest(data) {

  let responseData = {};

  //   console.log(data);
  const vendorRegistrationRequest = VendorRegistrationRequest.create({
    firstName: data.vendor_firstname,
    lastName: data.vendor_lastname,
    emailId: data.company_email,
    company: data.company_name,
    BusinessLicenseNumber: data.business_license,
    phoneNumber: data.contact,
    status: 0
  })
    .then(function (item) {
      console.log("ITEM", item);
      responseData = {
        message: "VendorRegistrationRequest Created",
        status: 200,
        error: "",
        userObject: item,
      };

     
    })
    .catch(function (error) {
      console.log("ERROR", error);
      responseData = { message: "Error", status: 501, error: error.errors };
    
    });
  

  return responseData;
}

module.exports = { vendorRegistrationRequest };
