const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { response } = require("express");

const { User } = require("../models/User");
// var { session } = require("../models/Session");

const { Product } = require("../models/Product");
async function addDataService() {
  let responseData;
  const product = await Product.create({
    name: "Alisha Solid Women's Cycling Shorts",
    category: "Clothing",
    retailPrice: 999,
    discountedPrice: 379,
    image: [
      "http://img5a.flixcart.com/image/short/u/4/a/altht-3p-21-alisha-38-original-imaeh2d5vm5zbtgg.jpeg",
      "http://img5a.flixcart.com/image/short/p/j/z/altght4p-26-alisha-38-original-imaeh2d5kbufss6n.jpeg",
      "http://img5a.flixcart.com/image/short/p/j/z/altght4p-26-alisha-38-original-imaeh2d5npdybzyt.jpeg",
      "http://img5a.flixcart.com/image/short/z/j/7/altght-7-alisha-38-original-imaeh2d5jsz2ghd6.jpeg",
    ],
    description:
      "Key Features of Alisha Solid Women's Cycling Shorts Cotton Lycra Navy, Red, Navy,Specifications of Alisha Solid Women's Cycling Shorts Shorts Details Number of Contents in Sales Package Pack of 3 Fabric Cotton Lycra Type Cycling Shorts General Details Pattern Solid Ideal For Women's Fabric Care Gentle Machine Wash in Lukewarm Water, Do Not Bleach Additional Details Style Code ALTHT_3P_21 In the Box 3 shorts",
    rating: 0,
    brand: "Alisha",
    specification: {
      product_specification: [
        { key: "Number of Contents in Sales Package", value: "Pack of 3" },
        { key: "Fabric", value: "Cotton Lycra" },
        { key: "Type", value: "Cycling Shorts" },
        { key: "Pattern", value: "Solid" },
        { key: "Ideal For", value: "Women's" },
        { value: "Gentle Machine Wash in Lukewarm Water, Do Not Bleach" },
        { key: "Style Code", value: "ALTHT_3P_21" },
        { value: "3 shorts" },
      ],
    },
  })
    .then(function (item) {
      console.log("ITEM", item);
      responseData = {
        message: "Product Created",
        status: 200,
        error: "",
        userObject: item,
      };
    })
    .catch(function (error) {
      console.log("ERROR", error);
      responseData = { message: "Error", status: 501, error: error };
      //   return "test";
    });

  await product;

  console.log(product);
}

module.exports = { addDataService };
