const { Cart } = require("../models/Cart");
const { get_logged_user_service } = require("./get_current_user_details");

async function getUserCart(emailId) {
  console.log("EMAIL ID", emailId);
  let user = await get_logged_user_service(emailId);
  //   console.log("USER", user);
  let cart = await Cart.findOne({
    where: {
      UserId: user.id,
    },
  });
  //   console.log("CART", cart);
  if (cart == undefined) {
    return {};
  }

  return cart.cart;
}

async function addToCart(emailId, productId, quantity) {
  let user = await get_logged_user_service(emailId);
  let cart = await Cart.findOne({
    where: {
      UserId: user.id,
    },
  });

  console.log("CART", productId);

  if (cart == undefined || cart.cart == {}) {
    let c = {};
    c[productId] = Number(quantity);
    cart = await Cart.create({
      UserId: user.id,
      cart: c,
    });

    return cart;
  } else {
    if (productId in cart.cart) {
      cart.cart[productId] += Number(quantity);
    } else {
      cart.cart[productId] = Number(quantity);
    }

    console.log("CART UPDATED", cart.cart);

    let updatedCart = await Cart.update(
      {
        cart: cart.cart,
      },
      {
        where: {
          id: cart.id,
        },
      }
    );

    console.log("UPDATED CART", cart);

    return cart;
  }
}

module.exports = { getUserCart, addToCart };
