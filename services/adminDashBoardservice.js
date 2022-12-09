const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Vendor, VendorRegistrationRequest } = require("../models/VendorRegistrationRequest");

async function search_Pending_Request(query) {
    let pendingVendor = await Vendor.findAll({
    where: {
        status : query
    },});


  return pendingVendor;
} 

async function Search_All_Venders(){
    let allusers = await VendorRegistrationRequest.findAll({
      where: {
        [Op.or]: [
          { status: '0' },
          { status: '1' },
          { status: '2' },
        ]
    },
    raw:true
    });
    
    return allusers
    
}

async function updatethevendor(data) {
    let venderdata = data;
    let responseData;
    let type = 0;
    if (venderdata.status === "Accept") {
      type = 1;
    } else if (venderdata.status === "Decline") {
      type = 2;
    }
    const vendor =  VendorRegistrationRequest.update(
        {
          status: type,
          
        },
        {
          where: {
            id: venderdata.Id,
          },
        }
      )
        .then(function (item) {
          responseData = {
            message: "VendorRegistration Status Updated",
            status: 200,
            error: "",
            userObject: item,
          };
        })
        .catch(function (error) {
          console.log("ERROR", error);
          responseData = { message: "Error", status: 501, error: error.errors };
        });

    console.log("response",responseData);
    return responseData;
  }
  

  


module.exports = { search_Pending_Request,Search_All_Venders, updatethevendor};