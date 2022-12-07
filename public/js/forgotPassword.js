function sendResetEmail(){
    var successStyle = document.getElementById('success');
    successStyle.style.display = 'block';
    var emailId = document.getElementById("user_email").value;

    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          emailId: emailId,
        }),
      };
      fetch("/forgotPassword", options)
        .then(function (response) {
            console.log("Inside fetch");
        })
        .catch(function (error) {
          console.log(error);
        });
}