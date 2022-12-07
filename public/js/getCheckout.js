var addresses;

var cookies;

var paymentMethods;

window.onload = async function () {

console.log("inside checkout js");

cookies = document.cookie
  .split(";")
  .map((cookie) => cookie.split("="))
  .reduce(
    (accumulator, [key, value]) => ({
      ...accumulator,
      [key.trim()]: decodeURIComponent(value),
    }),
    {}
  );

  const resp = await fetch(`/getCheckoutDetails?emailID=${cookies.email}`);

  var select = document.getElementById("selectAddress");
  addresses = await resp.json();

    for(var i = 0; i < addresses.length; i++) {
        var opt = addresses[i].address;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }

    const paymentResp = await fetch(`/getPaymentDetails?emailID=${cookies.email}`);

    var selectPayment = document.getElementById("selectPayment");
    paymentMethods = await paymentResp.json();

    console.log("payment methods--", paymentMethods);
  
      for(var i = 0; i < paymentMethods.length; i++) {
          var opt = paymentMethods[i].cardNumber;
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          selectPayment.appendChild(el);
      }


    const options = {
        method: "GET"
    };

    const cartResp = await fetch("/getUserCart", options)

}

function fillAddress() {

    //console.log("inside dropdown change");

    const a_fname = document.getElementById("firstName");
    const a_lname = document.getElementById("lastName");
    const a_email = document.getElementById("email");
    const a_address = document.getElementById("address");
    const a_state = document.getElementById("state");
    const a_country = document.getElementById("country");
    const a_zip = document.getElementById("zip");
    //const a_phoneNumber = document.getElementById("a_phoneNumber").value;
    const a_addressId = document.getElementById("address_id");
    //const a_type = document.getElementById("a_type").value;

    const selectedAddress = document.getElementById("selectAddress").value;

    for(var i = 0; i < addresses.length; i++) {

        var opt = addresses[i];

        if(selectedAddress == 'Choose a Address'){

            a_fname.value = "";
            a_lname.value = "";
            a_email.value = "";
            a_address.value = "";
            a_state.value = "";
            a_country.value = "";
            a_zip.value = "";
            a_addressId.value = ""

        }

        if(opt.address === selectedAddress){

            console.log("add i d --", opt);

            a_fname.value = opt.firstName;
            a_lname.value = opt.lastName;
            a_email.value = cookies.email;
            a_address.value = opt.address;
            a_state.value = opt.state;
            a_country.value = opt.country;
            a_zip.value = opt.zipcode;
            a_addressId.value = opt.id

        }

    }


}

function fillPaymentMethods() {


    const a_credit = document.getElementById("credit");
    const a_debit = document.getElementById("debit");
    const a_name = document.getElementById("cc-name");
    const a_number = document.getElementById("cc-number");
    const a_expiry = document.getElementById("cc-expiration");
    const a_cvv = document.getElementById("cc-cvv");
    const a_paymentId = document.getElementById("payment_id");


    const selectedPayment = document.getElementById("selectPayment").value;

    for(var i = 0; i < paymentMethods.length; i++) {

        var opt = paymentMethods[i];

        if(selectedPayment == 'Choose a Payment'){

            a_credit.value = "";
            a_debit.value = "";
            a_name.value = "";
            a_number.value = "";
            a_expiry.value = "";
            a_cvv.value = "";
            a_paymentId.value = ""

        }

        if(opt.cardNumber === selectedPayment){

            console.log("opt--", opt);

            if(opt.cardType == '2'){

                a_credit.checked = true;

            }else{

                a_debit.checked = true;
            }

            a_name.value = opt.nameOnCard;
            a_number.value = opt.cardNumber;
            a_expiry.value = opt.expiryDate.slice(0, 10);
            a_cvv.value = opt.cvv;
            a_paymentId.value = opt.id


        }

    }


}

function checkout() {

    const a_savecheck = document.getElementById("save-address");
    const a_fname = document.getElementById("firstName").value;
    const a_lname = document.getElementById("lastName").value;
    const a_address = document.getElementById("address").value;
    const a_city = document.getElementById("city").value;
    const a_state = document.getElementById("state").value;
    const a_country = document.getElementById("country").value;
    const a_zip = document.getElementById("zip").value;
    const a_phoneNumber = document.getElementById("phone-number").value;
    const a_credit = document.getElementById("credit").value;
    const a_debit = document.getElementById("debit").value;
    const a_name = document.getElementById("cc-name").value;
    const a_number = document.getElementById("cc-number").value;
    const a_expiry = document.getElementById("cc-expiration").value;
    const a_cvv = document.getElementById("cc-cvv").value;
    const p_savecheck = document.getElementById("save-payment");
    const a_addressId = document.getElementById("address_id").value;
    const a_paymentId = document.getElementById("payment_id").value;

    let card_type = 2;

    if(a_credit.checked == true){

        card_type = 2;

    }else{

        card_type = 1;
    }

    window.location = "/shop";

    cookies = document.cookie
        .split(";")
        .map((cookie) => cookie.split("="))
        .reduce(
            (accumulator, [key, value]) => ({
            ...accumulator,
            [key.trim()]: decodeURIComponent(value),
            }),
            {}
        );

    const options = {
        method: "POST",
        mode: "no-cors",
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
                    type: "Add",
                    cardNumber: a_number,
                    expiryDate: a_expiry,
                    cardType: card_type,
                    cvv: a_cvv,
                    paymentId: a_paymentId,
                    nameOnCard: a_name,
            isNewAddress: a_savecheck.checked,
            addressId: a_addressId,
            paymentMethodId: a_paymentId,
            isNewPaymentMethod: p_savecheck.checked,
            paymentId: a_paymentId,
        }),
      };

      console.log("options--", options.body);

      fetch("/checkout", options)
        .then(function (response) {
          console.log("response----", response);
          window.location.href = "/shop";
  
        //   response.json().then(function (value) {
            
        //     console.log(value);
        //     //window.location = "/";
        //   });
        });

    console.log("qwer--", window.location);

    window.location.href = "/shop";

    console.log("qwer--", window.location);

}