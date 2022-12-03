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

/**
 * Adds the product to cart in the specified quantity
 */
async function addToCart() {
  // const quantityEl = document.querySelector(
  //   "#product-add-to-cart .quantity-selector .quantity"
  // );
  // const qty = parseInt(quantityEl.innerHTML);
  // quantityEl.innerHTML = String(1);

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
