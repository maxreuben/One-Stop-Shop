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
newFunction();

const inputs = document.querySelectorAll(".input");
const inputs1 = document.querySelectorAll(".input1");

function newFunction() {
  -0, 0 + 1, 18;
}

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs1.forEach((input) => {
  input.addEventListener("blur", blurFunc);
});

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

window.onload = function () {
  const Send = document.getElementById("send");

  Send.addEventListener("click", () => {
    const p_fname = document.getElementById("user_name").value;
    const sub = "Customer Service";
    const p_Email = document.getElementById("user_email").value;
    const p_Phone = document.getElementById("user_phone").value;
    const message = document.getElementById("message").value;

    if (p_fname == "") {
      alert("Name must be filled out");
      return false;
    }
    if (message == "") {
      alert("Message cannot be empty");
      return false;
    }
    const data = { p_Email, sub, message };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        to: p_Email,
        subject: sub,
        text: message,
      }),
    };
    fetch("/sendMail", options)
      .then(function (response) {
        let json = response.json();
        console.log(json);
        // location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log('test')
  });
};