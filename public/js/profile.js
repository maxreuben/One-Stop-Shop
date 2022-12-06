window.onload = function () {
  const Save = document.getElementById("p_save");

  Save.addEventListener("click", () => {
    const p_fname = document.getElementById("p_fname").value;
    const p_lname = document.getElementById("p_lname").value;
    const p_password = document.getElementById("p_password").value;
    const p_Email = document.getElementById("p_Email").value;
    const p_Phone = document.getElementById("p_phone").value;

    if (p_fname == "") {
      alert("First Name must be filled out");
      return false;
    }
    if (p_lname == "") {
      alert("Last Name must be filled out");
      return false;
    }
    if (p_Email == "") {
      alert("Email Name must be filled out");
      return false;
    }
    if (p_password == "") {
      alert("Password must be filled out");
      return false;
    }

    if (p_password.length < 10) {
      alert("Password should be 10 Digit long");
      return false;
    }

    // console.log('test')
    const data = { p_fname, p_lname, p_Email, p_password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        firstName: p_fname,
        lastName: p_lname,
        emailId: p_Email,
        password: p_password,
        phoneNumber: p_Phone,
      }),
    };
    fetch("/modifyUser", options)
      .then(function (response) {
        let json = response.json();
        console.log(json);
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};


function signOut(){

  document.cookie = "emailId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location = "/"
}