window.onload = function () {
  const Save = document.getElementById("p_save");

  Save.addEventListener("click", () => {
    const a_fname = document.getElementById("a_fname").value;
    const a_lname = document.getElementById("a_lname").value;
    const a_address = document.getElementById("a_address").value;
    const a_state = document.getElementById("a_state").value;
    const a_city = document.getElementById("a_city").value;
    const a_country = document.getElementById("a_country").value;
    const a_zip = document.getElementById("a_zip").value;
    const a_phoneNumber = document.getElementById("a_phoneNumber").value;
    const a_addressId = document.getElementById("a_addressId").value;
    const a_type = document.getElementById("a_type").value;

    if (a_fname == "") {
      alert("First Name must be filled out");
      return false;
    }
    if (a_lname == "") {
      alert("Last Name must be filled out");
      return false;
    }
    if (a_address == "") {
      alert("Address must be filled out");
      return false;
    }
    if (a_state == "") {
      alert("State must be filled out");
      return false;
    }
    if (a_city == "") {
      alert("City must be filled out");
      return false;
    }
    if (a_country == "") {
      alert("Country must be filled out");
      return false;
    }
    if (a_zip == "") {
      alert("Zip must be filled out");
      return false;
    }
    if (a_phoneNumber == "") {
      alert("Phone Number must be filled out");
      return false;
    }

    let cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="))
      .reduce(
        (accumulator, [key, value]) => ({
          ...accumulator,
          [key.trim()]: decodeURIComponent(value),
        }),
        {}
      );

    const data = {
      a_fname,
      a_lname,
      a_city,
      a_address,
      a_state,
      a_country,
      a_zip,
      a_phoneNumber,
      a_addressId,
      a_type,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        firstName: a_fname,
        lastName: a_lname,
        address: a_address,
        city: a_city,
        state: a_state,
        country: a_country,
        zipcode: a_zip,
        phoneNumber: a_phoneNumber,
        type: a_type,
        addressId: a_addressId,
      }),
    };
    fetch("/add-address", options)
      .then(function (response) {
        let json = response.json();

        window.location = "/manageAddress";
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};
