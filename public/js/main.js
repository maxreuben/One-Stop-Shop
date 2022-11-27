/* ========== Navigation =========== */
const navList = document.querySelector(".nav-list");
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

console.log(cookies.email);
// cookies.email = '';
// document.getElementById("user_name").innerHTML = cookies.email;

document.querySelector(".hamburger").onclick = () => {
  navList.classList.add("show");
};

document.querySelector(".close").onclick = () => {
  navList.classList.remove("show");
};

/* ========== User Form =========== */
const formWrapper = document.querySelector(".form-wrapper");
const inputs = document.querySelectorAll(".form-box input[type = 'password']");
const icons = [...document.querySelectorAll(".form-icon")];
const spans = [...document.querySelectorAll(".form-box .top span")];
const userForm = document.querySelector(".user-form");

[".user-icon", ".user-link"].forEach((p) => {
  document.querySelector(p).onclick = () => {
    console.log("here");
    if (cookies.email == undefined || cookies.email.length === 0) {
      userForm.classList.add("show");
      navList.classList.remove("show");
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

const signInButton1 = document.getElementById("login");
const signUpButton1 = document.getElementById("signup");

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
  fetch("/signin", options)
    .then(function (response) {
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
            "email=" +
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

          location.href = "/";
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
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
