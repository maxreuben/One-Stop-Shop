const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Order } = require("../models/Order");
const { User } = require("../models/User");

const { OrderProduct } = require("../models/OrderProduct");
const { Cart } = require("../models/Cart");

async function checkout(cart, totalPrice, emailId, addressId, paymentMethodId) {
  let user = await User.findOne({
    where: {
      emailId: emailId,
    },
  });
  console.log(user);

  let responseData;

  console.log("cart567--", cart);

  const order = await Order.create({
    UserId: user.id,
    orderAmount: totalPrice,
    AddressId: addressId,
    PaymentMethodId : paymentMethodId
  })
    .then(async function (item) {
      console.log("ITEM", item);
      responseData = {
        message: "Order Created",
        status: 200,
        error: "",
        userObject: item,
      };

      let cartId;
      let cart = Cart.findOne({ where: { UserId: user.id } }).then(async function (
        res
      ) {
        let userCart = res.cart;
        cartId = res.id;
        for( var key in userCart) {
          await OrderProduct.create({
            OrderId: item.id,
            ProductId: key,
            quantity: userCart[key]
          })
        }

      });

      await cart;
      Cart.destroy({where:{id: cartId}})
    })
    .catch(function (error) {
      console.log("ERROR", error);
      console.log(user);
      responseData = { message: "Error", status: 501, error: error.errors };
    });

  return responseData;
}

module.exports = { checkout };
