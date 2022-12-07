var navList = document.querySelector(".nav-list");

var cookies = document.cookie
  .split(";")
  .map((cookie) => cookie.split("="))
  .reduce(
    (accumulator, [key, value]) => ({
      ...accumulator,
      [key.trim()]: decodeURIComponent(value),
    }),
    {}
  );

// console.log(cookies.email);

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
  }
  else
  {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
      end = dc.length;
      }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
} 
// cookies.email = '';
// document.getElementById("user_name").innerHTML = cookies.email;

document.querySelector(".hamburger").onclick = () => {
  navList.classList.add("show");
};

document.querySelector(".close").onclick = () => {
  navList.classList.remove("show");
};

/* ========== User Form =========== */
var formWrapper = document.querySelector(".form-wrapper");
var inputs = document.querySelectorAll(".form-box input[type = 'password']");
var icons = [...document.querySelectorAll(".form-icon")];
var spans = [...document.querySelectorAll(".form-box .top span")];
var userForm = document.querySelector(".user-form");

[".user-icon", ".user-link"].forEach((p) => {
  document.querySelector(p).onclick = () => {
    console.log("here");
    var myCookie = getCookie("emailId");
    if (myCookie == null || cookies.emailId.length === 0) {
      // userForm.classList.add("show");
      // navList.classList.remove("show");
      location.href = "/signin?#";
    } else {
      location.href = "/profile";
    }

    
  };
});

document.querySelector(".close-form").onclick = () => {
  userForm.classList.remove("show");
};

spans.map((span) => {
  span.addEventListener("click", (e) => {
    const color = e.target.dataset.id;
    formWrapper.classList.toggle("active");
    userForm.classList.toggle("active");
    document.querySelector(":root").style.setProperty("--custom", color);
  });
});

Array.from(inputs).map((input) => {
  icons.map((icon) => {
    icon.innerHTML = `<img src="/images/eye.svg" alt="" />`;

    icon.addEventListener("click", () => {
      const type = input.getAttribute("type");
      if (type === "password") {
        input.setAttribute("type", "text");
        icon.innerHTML = `<img src="/images/hide.svg" alt="" />`;
      } else if (type === "text") {
        input.setAttribute("type", "password");
        icon.innerHTML = `<img src="/images/eye.svg" alt="" />`;
      }
    });
  });
});

var signInButton1 = document.getElementById("login");
var signUpButton1 = document.getElementById("signup");

signInButton1.addEventListener("click", () => {
  let username = document.getElementById("Signin_email").value;
  let password = document.getElementById("Signin_password").value;

  if (username == "") {
    alert("Username must be filled out");
    console.log(username, password);
    return false;
  }
  if (password == "") {
    alert("Password must be filled out");
    console.log(username, password);
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
<<<<<<< Updated upstream
  console.log('Fetching');
  fetch("/signin", options).then(function (response) {
=======
  fetch("http://localhost:5001/signin", options)
    .then(function (response) {
>>>>>>> Stashed changes
      console.log("RESPONSE", response);

      response.json().then(function (value) {
        // console.log("INSIDE");
        console.log(value);
        console.log(value.userObject.firstName);
        // let c_name = value.userObejct.firstName;

        if (value.status != 200) {
          alert("failure");
        } else {
          // alert('success')
          let c_username = document.getElementById("Signin_email");
          let c_password = document.getElementById("Signin_password");

          today = new Date();
          var expire = new Date();
          expire.setTime(today.getTime() + 3600000 * 24 * 15);

          // document.cookie = "name="+c_name+";path=/" + ";expires="+expire.toUTCString();
          document.cookie =
            "emailId=" +
            c_username.value +
            ";path=/" +
            ";expires=" +
            expire.toUTCString();
          document.cookie =
            "password=" +
            encodeURI(c_password.value) +
            ";path=/" +
            ";expires=" +
            expire.toUTCString();

<<<<<<< Updated upstream
          // location.href = "/";
          location.reload();
=======
          location.href = 'http://localhost:5001/';
>>>>>>> Stashed changes
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  
    console.log('Fetching2');
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
  if (!email.match(mailformat)) {
    alert("Please enter valid email");
    return false;
  }

  if (password.length < 10) {
    alert("Password should be 10 Digit long");
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
  fetch("/signup", options)
    .then(function (response) {
      let json = response.json();
      console.log(json);
    })
    .catch(function (error) {
      console.log(error);
    });
});

document.getElementById("vendor_reg").onclick = () => {
  console.log("here");
  var myCookie = getCookie("emailId");
  if (myCookie == null || cookies.emailId.length === 0) {
    // userForm.classList.add("show");
    // navList.classList.remove("show");
    location.href = "/signin";
  } else {
    location.href = "/addVendor";
  }

  
};
