const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {
  updatethevendor,
} = require("../services/adminDashBoardservice");

const {
  Search_All_Venders,
} = require("../services/adminDashBoardservice");



app.get("/adminDashboardPage", urlencodedParser, async function (request, response) {

    const resp = await Search_All_Venders();
    console.log("resp--1" , resp);

    response.render("adminDashboard.ejs",{ Vendors: resp });
  }
);

app.post("/adminDashboard", urlencodedParser, async function (request, response) {

  const resp = await Search_All_Venders();

  console.log("resp1--", resp);
  data = request.body;
  updatethevendor(data)
    .then(function (responseData) {
      response.status = responseData.status;
      response.send(JSON.stringify(responseData));
     
    })
    .catch(function (error) {
      response.status = 404;
     
      response.send(JSON.stringify({ Response: "Error", error: error }));
    });
   
});



module.exports = router;