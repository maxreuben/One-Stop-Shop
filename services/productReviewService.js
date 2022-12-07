const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { response } = require("express");
// const {  sendMail } = require("./email");
const {get_logged_user_service} = require("./get_current_user_details")




const { ProductReview } = require("../models/ProductReview");

async function productReview(data,EmailId) {
  console.log("EMAIL ID", EmailId)
    let user = await get_logged_user_service(EmailId);
    console.log("INSIDE PRODUT REVIEW FUNCTION")

  let responseData;

  console.log("USER", user);

  //   console.log(data);
  const productReview = await ProductReview.create({
    UserId:  user.id,
    ProductId: data.productId,
    OrderId: data.orderId,
    rating: data.rating,
    review: data.comments
   
  })
    .then(function (item) {
      console.log("ITEM", item);
      responseData = {
        message: "Product Review Created",
        status: 200,
        error: "",
        userObject: item,
      };

    
    })
    .catch(function (error) {
      console.log("ERROR", error);
      responseData = { message: "Error", status: 501, error: error.errors };
      //   return "test";
    });
  console.log(user);

  return responseData;
}

async function getProductReviews(productId){

  console.log("Product Id", productId)
    let reviews = await ProductReview.findAll({
        where: {
            ProductId: productId
        }
    })

    return reviews
}

module.exports = { productReview, getProductReviews };