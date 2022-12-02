window.onload = function () {
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const signUpButton1 = document.getElementById("signUp1");
  const signInButton1 = document.getElementById("signIn1");

  const container = document.getElementById("container");

  signInButton1.addEventListener("click", () => {
    let username = document.getElementById("Signin_email").value;
    let password = document.getElementById("Signin_password").value;
    
    if (username == "") {
      alert("Username must be filled out");
      return false;
    }
    if (password == "") {
      alert("Password must be filled out");
      return false;
    }

    console.log(username, password);
    const data = { username, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        emailId: username,
        password: password,
      }),
    };
    fetch("http://localhost:5001/signin", options)
      .then(function (response) {
        console.log(response);

        response.json().then(function (value) {
          // console.log("INSIDE");
          console.log(value);
          // console.log(value.userObject.firstName);
          // let c_name = value.userObejct.firstName;

          if(value.status != 200)
          {
            alert('failure')
          }
          else{
            // alert('success')
            let c_username = document.getElementById("Signin_email");
            let c_password = document.getElementById("Signin_password");
            
            
            today = new Date();
            var expire = new Date();
            expire.setTime(today.getTime() + 3600000*24*15);
          
            // document.cookie = "name="+c_name+";path=/" + ";expires="+expire.toUTCString();
            document.cookie = "emailId="+c_username.value+";path=/" + ";expires="+expire.toUTCString();
            document.cookie = "password="+encodeURI(c_password.value)+";path=/" + ";expires="+expire.toUTCString();
            
            location.href = '/';
            
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  signUpButton.addEventListener("click", () => {
    
    container.classList.add("right-panel-active");
  });

  signUpButton1.addEventListener("click", () => {
    let fname = document.getElementById("Signin_Fname").value;
    let lname = document.getElementById("Signin_Lname").value;
    let email = document.getElementById("Signin_Email").value;
    let password = document.getElementById("Signin_Password").value;

    if (fname == "") {
      alert("First Name must be filled out");
      return false;
    }
    if (lname == "") {
      alert("Last Name must be filled out");
      return false;
    }
    if (email == "") {
      alert("Email Name must be filled out");
      return false;
    }
    if (password == "") {
      alert("Password must be filled out");
      return false;
    }

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!email.match(mailformat))
    {
      alert("Please enter valid email")
      return false;
    }

    if(password.length < 10 )
    {
      alert("Password should be 10 Digit long")
      return false;
    }


    // console.log('test')
    const data = { fname, lname, email, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        firstName: fname,
        lastName: lname,
        emailId: email,
        password: password,
      }),
    };
    fetch("http://localhost:5001/signup", options)
      .then(function (response) {
        
        let json = response.json();
        console.log(json);
      })
      .catch(function (error) {
        console.log(error);
      });
    container.classList.remove("right-panel-active");
  });
};
