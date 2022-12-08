window.onload = function () {
    const Send = document.getElementById("submit_vendor");
  
    Send.addEventListener("click", () => {
      const v_fname = document.getElementById("vendorname_first").value;
      const v_lname= document.getElementById("vendorname_last").value;
      const company = document.getElementById("company").value;
      const company_email = document.getElementById("company_email").value;
      const business_license = document.getElementById("business_license").value;
      const contact = document.getElementById("contact1").value
  
      if (v_fname == "") {
        alert("First Name must be filled out");
        return false;
      }
      if (v_lname == "") {
        alert("Last Name must be filled out");
        return false;
      }
      if (company == "") {
        alert("Company Name cannot be empty");
        return false;
      }
      if (company_email == "") {
        alert("Company email cannot be empty");
        return false;
      }
      if (business_license == "") {
        alert("Enter a valid business license number");
        return false;
      }
      if (contact == "") {
        alert("Contact number cannot be empty");
        return false;
      }
      const data = { v_fname,v_lname,company,company_email,business_license, contact};
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            vendor_firstname : v_fname,
            vendor_lastname : v_lname,
            company_name : company,
            company_email : company_email,
            business_license: business_license,
            contact : contact,
          
        }),
      };
      fetch("/addVendor", options)
        .then(function (response) {
          let json = response.json();
          console.log(json);
          // location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
        window.location = '/thanks'
      // console.log('test')
    });
  };

  