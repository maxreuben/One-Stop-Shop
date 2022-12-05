function resetPassword(){
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var search = window.location.search;
    var emailId = search.substring(
        search.indexOf("email=") + 6, 
        search.lastIndexOf("&hash")
    );

    if(password == confirmPassword){
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              emailId: emailId,  
              password: password,
            }),
        };
        fetch("/resetPassword", options)
        .then(function (response) {
            console.log("Inside fetch");
        })
        .catch(function (error) {
          console.log(error);
        });
    }else{
        return false;
    }
}