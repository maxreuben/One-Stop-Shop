const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {get_product_service} = require("../services/get_products_home_service");


app.get("/get-home-products", urlencodedParser, async function (request, response) {

    data = request.body;

    let res;

    res = await get_product_service();

    response.send(res);

});

module.exports = router;

