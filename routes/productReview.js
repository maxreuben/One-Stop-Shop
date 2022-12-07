const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { productReview, getProductReviews } = require("../services/productReviewService");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {searchReview} = require("../services/productReviewService");
const { getCookies } = require("../services/getCookies");


app.get("/productReview/:productId", urlencodedParser, async function (request, response) {
    
    const { productId } = request.params;

    console.log(productId)
    
    const productReviews = await getProductReviews(productId);
   
    return response.send(JSON.stringify({"response": productReviews}));
    //
  });

app.post("/productReview", urlencodedParser, async function (request, response) {
    data = request.body;
    let cookies = await getCookies(request);
    if(cookies.emailId == undefined || cookies.emailId ==""){
        response.send("");
    }
    // console.log(request);
   const orderId = data.orderId ;
   const comments = data.productcomments;
   const rating = data.productrating;
   const productId = data.productId; 
    console.log("DATA", data);
  
  
  
    let respo = productReview(data,cookies.emailId) 
      .then(function (responseData) {
       
        console.log("RESPONSE DATA", responseData);
        response.status = responseData.status;
        response.send(JSON.stringify(responseData));
      })
      .catch(function (error) {
        console.log("FROM ERROR", error)
        response.status = 404;
        response.send(JSON.stringify({ Response: "Error", error: error }));
      });
  });


  module.exports = router
  