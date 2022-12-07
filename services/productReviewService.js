const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { response } = require("express");
// const {  sendMail } = require("./email");

const { ProductReview } = require("../models/ProductReview");

async function productReview(data,EmailId) {
    let user = await get_logged_user_service(EmailId);

  let responseData = {};

  //   console.log(data);
  const productReview = await ProductReview.create({
    UserId:  user.Id,
    ProductId: data.productId,
    OrderId: data.orderId,
    rating: data.rating,
    review: data.review
   
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
    let reviews = await ProductReview.findAll({
        where: {
            ProductId: productId
        }
    })

    return reviews
}

module.exports = { productReview, getProductReviews };