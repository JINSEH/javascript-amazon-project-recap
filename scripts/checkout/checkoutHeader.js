import { cart } from "../../data/cart.js";

export function renderCheckoutHeader() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += Number(cartItem.quantity);
  })

  let cartQuantityText = '';

  if (cartQuantity === 1) {
    cartQuantityText = `${cartQuantity} item`
  }

  else {
    cartQuantityText = `${cartQuantity} items`
  }
  
  document.querySelector('.js-checkout-quantity-link').innerHTML = cartQuantityText;
};
