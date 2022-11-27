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
  const quantityEl = document.querySelector(
    "#product-add-to-cart .quantity-selector .quantity"
  );
  const qty = parseInt(quantityEl.innerHTML);
  quantityEl.innerHTML = String(1);

  console.log("Adding to cart");
}
