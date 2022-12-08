//const e = require("express");

window.onload = function () {
  const Save = document.getElementById("p_save1");

  Save.addEventListener("click", () => {
    const a_cardNumber = document.getElementById("a_cardNumber").value;
    const a_expiryDate = document.getElementById("a_expiryDate").value;
    const a_cardType = document.getElementById("a_cardType").value;
    const a_cvv = document.getElementById("a_cvv").value;
    const a_paymentId = document.getElementById("a_paymentId").value;
    const a_type1 = document.getElementById("a_type1").value;
    const a_nameOnCard = document.getElementById("a_nameOnCard").value;

    //let addedToCart = document.getElementById("invalid-card-number");
    //addedToCart.style.visibility = "";


    console.log(a_cardType);

    if (a_cardNumber == "") {
      alert("Card Number must be filled out");
      return false;
    }
    if (a_expiryDate == "") {
      alert("Expiry Date must be filled out");
      return false;
    }
    if (a_cardType == "") {
      alert("Card Type must be filled out");
      return false;
    }
    if (a_cvv == "") {
      alert("CVV must be filled out");
      return false;
    }
    if (a_nameOnCard == "") {
      alert("Name on Card must be filled out");
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

      var cardnumber = a_cardNumber;

      if(cardnumber == "") {
        let addedToCart = document.getElementById("invalid-card-number");
        addedToCart.style.visibility = "visible";
      } else {
        var regex = /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/;                
        if(regex.test(cardnumber) === false) {
            let addedToCart = document.getElementById("invalid-card-number");
            addedToCart.style.visibility = "visible";
            
            return;

        } else {
        }
    }

    const data = {
      a_cardNumber,
      a_expiryDate,
      a_cardType,
      a_cvv,
      a_paymentId,
      a_type1,
      a_nameOnCard,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        cardNumber: a_cardNumber,
        expiryDate: a_expiryDate,
        cardType: a_cardType,
        cvv: a_cvv,
        type: a_type1,
        paymentId: a_paymentId,
        nameOnCard: a_nameOnCard,
      }),
    };
    fetch("/add-payment-method", options)
      .then(function (response) {

        if(a_type1 == "Add"){

          response.json().then(function (value) {
            
            //console.log("json--", value);

            if(value.status == 501){

              //console.log("json--", value);

              let invalidCard = document.getElementById("card-already-exits");
              invalidCard.style.visibility = "visible";

            }else{
              window.location = "/managePaymentMethod";
            }

          })
      }else{
        window.location = "/managePaymentMethod";
      }

      })
      .catch(function (error) {
        console.log(error);
      });
  });
};
