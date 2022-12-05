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
          }else if (value.userObject.role === "100") {
            // alert('success')
            let c_username = document.getElementById("Signin_email");
            let c_password = document.getElementById("Signin_password");
  
            today = new Date();
            var expire = new Date();
            expire.setTime(today.getTime() + 3600000 * 24 * 15);
  
            // document.cookie = "name="+c_name+";path=/" + ";expires="+expire.toUTCString();
            document.cookie = "emailId="+c_username.value+";path=/" + ";expires="+expire.toUTCString();
            document.cookie = "password="+encodeURI(c_password.value)+";path=/" + ";expires="+expire.toUTCString();
  
            location.href = "/vendorHome";
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

// let pass = document.getElementById("Signin_Password");
// pass.addEventListener('input', () => {
//   var password_strength = document.getElementById("strength");

//   //TextBox left blank.
//   if (pass.value.length == 0) {
//     password_strength.innerHTML = "";
//     return;
//   }

//   //Regular Expressions.
//   var regex = new Array();
//   regex.push("[A-Z]"); //Uppercase Alphabet.
//   regex.push("[a-z]"); //Lowercase Alphabet.
//   regex.push("[0-9]"); //Digit.
//   regex.push("[$@$!%*#?&]"); //Special Character.

//   var passed = 0;

//   //Validate for each Regular Expression.
//   for (var i = 0; i < regex.length; i++) {
//     if (new RegExp(regex[i]).test(pass.value)) {
//       passed++;
//     }
//   }

//   //Display status.
//   var strength = "";
//   switch (passed) {
//     case 0:
//     case 1:
//     case 2:
        
//     // strength = "<small class='progress-bar bg-danger' style='width: 40%'>Weak</small>";
//       password_strength.innerHTML = "hehe"
//       pass.style.borderColor = "#ff5925"
//       break;
//     case 3:
//       // strength = "<small class='progress-bar bg-warning' style='width: 60%'>Medium</small>";
//       break;
//     case 4:
//       // strength = "<small class='progress-bar bg-success' style='width: 100%'>Strong</small>";
//       break;

//   }
//   password_strength.innerHTML = strength;

// })
( () => {
  /**
   * Parse a password string into a numeric value.
   *
   * @param {string} password
   * @return {number}
   */
  
// let pass = document.getElementById("Signin_Password");
  let evaluatePassword = ( password ) => {
    let score = 0;

    score = password.length;
    score = ( password.match( /[!]/gmi ) ) ? score + ( password.match( /[!]/gmi ).length * 3 ) : score;
    score = ( password.match( /[A-Z]/gm ) ) ? score + 3 : score;
    score = ( password.match( /[0-9]/gmi ) ) ? score + 3 : score;

    return score;
  };

  /**
   * Convert a numeric score into an object of 'DOM update' data.
   *
   * @param {number} score
   * @return {Object}
   */
  let scoreToData = ( score ) => {    
    if ( score >= 30 ) {
      return {
        width: '100%',
        color: '#26de81',
        label: 'Strong',
      };
    } else if ( score >= 20 ) {
      return {
        width: '66%',
        color: '#fd9644',
        label: 'Medium',
      };
    } else {
      return {
        width: '33%',
        color: '#fc5c65',
        label: 'Weak',
      };
    }
  };

  window.addEventListener( 'DOMContentLoaded', () => {
    // Get element refs.
    let p = document.querySelector( '.js--password' );
    let b = document.querySelector( '.js--password-bar' );
    let t = document.querySelector( '.js--password-text' );
    let pass = document.getElementById("Signin_Password");

    // Listen for updates to password field.
    pass.addEventListener( 'input', () => {
      // Convert current value to data.
      let data = scoreToData( evaluatePassword( pass.value ) );

      // Update DOM.
      b.style.width = data.width;
      b.style.background = data.color;
      t.innerText = data.label;
    } );
  } );
} )();
