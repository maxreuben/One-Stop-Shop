const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {search_product} = require("../services/search_product_service");
const cons = require("consolidate");


app.get("/search-product", urlencodedParser, async function (request, response) {

    let query = request.body.query;
    //console.log(query);
    let res;

    res = await search_product(query);

    response.send(res);

});

module.exports = router;
