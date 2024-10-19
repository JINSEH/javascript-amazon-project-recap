export let cart = JSON.parse(localStorage.getItem('cart'));


if (!cart) {
  cart = [{
    productId:
    'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2,
    deliveryOptionsId: '1'
  },
{
  productId:
    '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1,
    deliveryOptionsId: '2'
}]
}
export function addToCart(productId) {
  let matchingItem;

    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    })

    if (matchingItem) {
      matchingItem.quantity ++;
    }

    else {
      cart.push({
        productId,
        quantity : 1,
        deliveryOptionsId : '1'
      })
    }
    calculateCartQuantity();
    console.log(cart);
    saveToStorage();
    }

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += Number(cartItem.quantity);
  })
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
};

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (!(cartItem.productId === productId)) {
      newCart.push(cartItem);
    }
  }) 
  cart = newCart;
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function updateCartQuantity() {
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

export function updateQuantity(productId, newQuantity, outputQuantity) {
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      newQuantity = Number(newQuantity);
      if (newQuantity >= 0 && newQuantity < 1000) 
      cartItem.quantity = newQuantity;

      else {
        outputQuantity.innerHTML = 1;
      }
    }
  })
  updateCartQuantity();
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionsId = deliveryOptionId;

  saveToStorage();
};