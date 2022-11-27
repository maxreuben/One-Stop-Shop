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

function newFunction() {
    -0, 0 + 1, 18;;
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

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});
window.onload = function () {
    const Send = document.getElementById("send");
  
    Send.addEventListener("click", () => {
      const p_fname = document.getElementById("user_name").value;
     
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
      // console.log('test')
    })};