// const { application } = require("express");
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { loginService } = require("../services/loginService");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// const signupService = require("../services/signupService").signupService;
const { get_product_service } = require("../services/get_products_service");

app.get("/", urlencodedParser, async function (request, response) {
  data = request.body;
  // console.log(request);
  let res = await get_product_service();

  // console.log("PRODUCTS", res);

  response.render("home", {
    productList: res,
    showJewellery: "getClickedProducts('Jewellery');",
    showFurniture: "getClickedProducts('Furniture');",
    showClothing: "getClickedProducts('Clothing');",
    showFootwear: "getClickedProducts('Footwear');",
  });
});

// app.post("/signin", urlencodedParser, async function (request, response) {

//     data = request.body
//     username = data.emailId
//     password = data.password

//     let checkUser  = await loginService(username, password);

//     console.log("POST TEST");
//     console.log(username, password);

//     // response.status(200);
//     response.send(checkUser);

// });

module.exports = router;
