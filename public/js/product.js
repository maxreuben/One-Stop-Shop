function showDescription() {
  const productDesc = document.getElementById("product-description");
  productDesc.firstElementChild.classList.remove("hide-content");
  productDesc.firstElementChild.classList.add("show-content");
  productDesc.children[1].classList.add("hide");
  productDesc.children[2].classList.remove("hide");
}

function hideDescription() {
  const productDesc = document.getElementById("product-description");
  productDesc.firstElementChild.classList.add("hide-content");
  productDesc.firstElementChild.classList.remove("show-content");
  productDesc.children[1].classList.remove("hide");
  productDesc.children[2].classList.add("hide");
}

/**
 * Adjusts the quantity displayed by a relativeAmount
 * @param {number} adjustAmount - the number to add to quantity
 */
function adjustQuantity(adjustAmount) {
  const quantityEl = document.querySelector(
    "#product-add-to-cart .quantity-selector .quantity"
  );
  const currQty = parseInt(quantityEl.innerHTML);
  quantityEl.innerHTML = Math.max(1, currQty + adjustAmount).toString();
}

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

/**
 * Adds the product to cart in the specified quantity
 */
async function addToCart() {
  // const quantityEl = document.querySelector(
  //   "#product-add-to-cart .quantity-selector .quantity"
  // );
  // const qty = parseInt(quantityEl.innerHTML);
  // quantityEl.innerHTML = String(1);
  var myCookie = getCookie("emailId");
      if (myCookie == null || cookies.emailId.length === 0) {
      // userForm.classList.add("show");
      // navList.classList.remove("show");
      location.href = "/signin?#";
    } else {
     

  let addedToCart = document.getElementById("added-to-cart");
  addedToCart.style.visibility = "visible";

  console.log("Adding to cart");
  console.log(document.getElementById("quantity").innerText)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      productId: document.getElementById("a_addressId").value,
      quantity: document.getElementById("quantity").innerText,
    }),
  };
  fetch("http://localhost:5001/addToCart", options)
    .then(function (response) {
      console.log(response);

      response.json().then(function (value) {
        
        console.log(value);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
