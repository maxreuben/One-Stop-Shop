window.onload = function () {
  const Save = document.getElementById("p_save1");

  Save.addEventListener("click", () => {
    const a_cardNumber = document.getElementById("a_cardNumber").value;
    const a_expiryDate = document.getElementById("a_expiryDate").value;
    const a_cardType = document.getElementById("a_cardType").value;
    const a_cvv = document.getElementById("a_cvv").value;
    const a_paymentId = document.getElementById("a_paymentId").value;
    const a_type1 = document.getElementById("a_type1").value;

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
      a_cardNumber,
      a_expiryDate,
      a_cardType,
      a_cvv,
      a_paymentId,
      a_type1,
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
      }),
    };
    fetch("/add-payment-method", options)
      .then(function (response) {
        let json = response.json();
        window.location = "http://localhost:5001/managePaymentMethod";
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};
