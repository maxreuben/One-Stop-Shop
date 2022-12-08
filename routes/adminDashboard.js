const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });


app.get("/adminDashboard", urlencodedParser, async function (request, response) {

    response.render("adminDashboard.ejs",);
  }
);

app.post("/adminDashboard", urlencodedParser, function (request, response) {
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