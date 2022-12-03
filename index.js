express = require("express");
app = express();
var bodyParser = require("body-parser");
var multer = require("multer");
var forms = multer();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
var cookieParser = require("cookie-parser");

var engines = require("consolidate");
app.set("views", __dirname + "/views");
// app.engine("html", engines.mustache);
app.set("view engine", "ejs");
app.use(express.static("public"));
const cors = require("cors");
app.use(cors());

let os = require("os");

if (os.platform() == "win32") {
  process.env.WEBSITE_PASSWORD = process.env.WINDOWS_APP_PASSWORD;
} else if (os.platform() == "darwin") {
  process.env.WEBSITE_PASSWORD = process.env.MAC_APP_PASSWORD;
} else {
  process.env.WEBSITE_PASSWORD = process.env.OTHER_APP_PASSWORD;
}

// );
// API ROUTES REGISTER
const signuproute = require("./routes/signUp");
app.use(signuproute);

const signinroute = require("./routes/login");
app.use(signinroute);

const addPaymentMethodroute = require("./routes/addPaymentMethod");
app.use(addPaymentMethodroute);

const modifyuserroute = require("./routes/modifyUser");
app.use(modifyuserroute);

const addDataRoute = require("./routes/addDataToDatabase");
app.use(addDataRoute);

const homePageRoute = require("./routes/homePage");
app.use(homePageRoute);

const getloggeduser = require("./routes/current_user_details");
app.use(getloggeduser);

const search = require("./routes/search");
app.use(search);

const checkout = require("./routes/checkout");
app.use(checkout);

const email = require("./routes/email");
app.use(email);

const profile = require("./routes/profile");
app.use(profile);

const product = require("./routes/product");
app.use(product);

const shop = require("./routes/shop");
app.use(shop);

const contactPage = require("./routes/contact");
app.use(contactPage);

const orderHistory = require("./routes/orderHistory");
app.use(orderHistory);

const addressHistory = require("./routes/addAddress");
app.use(addressHistory);

const paymentMethodsHistory = require("./routes/addPaymentMethod");
app.use(paymentMethodsHistory);

const aboutus = require("./routes/aboutus");
app.use(aboutus);

const editAddress = require("./routes/editAddress");
app.use(editAddress);

const addAddress = require("./routes/addAddressPage");
app.use(addAddress);
const cart = require("./routes/cartRoutes");
app.use(cart);

const forgotPassword = require("./routes/forgotPassword");
app.use(forgotPassword);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(forms.array());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8001;

app.listen(PORT, function () {
  console.log(`server started on port ${PORT}`);
});
