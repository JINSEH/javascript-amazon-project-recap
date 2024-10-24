import { renderCheckoutHeader } from "../scripts/checkout/checkoutHeader.js";
import { addToCart, loadFromStorage } from "./cart.js";

function Cart(localStorageKey) {
  const cart = {
    cartItems : undefined,
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    
      if (!this.cartItems) {
        this.cartItems = [{
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
      };
    },
  
    saveToStorage() {
      localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },
  
    addToCart(productId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      })
    
      if (matchingItem) {
        matchingItem.quantity ++;
      }
    
      else {
        cart.cartItems.push({
          productId,
          quantity : 1,
          deliveryOptionsId : '1'
        })
      };
      this.saveToStorage();
      },
  
      calculateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
          cartQuantity += Number(cartItem.quantity);
        })
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
      },
  
      removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
          if (!(cartItem.productId === productId)) {
            newCart.push(cartItem);
          }
        }) 
        this.cartItems = newCart;
        this.saveToStorage();
      },
  
      updateQuantity(productId, newQuantity, outputQuantity) {
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            newQuantity = Number(newQuantity);
            if (newQuantity >= 0 && newQuantity < 1000) 
            cartItem.quantity = newQuantity;
      
            else {
              outputQuantity.innerHTML = 1;
            }
          }
        })
        renderCheckoutHeader();
        this.saveToStorage();
      },
  
      updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId === productId) {
            matchingItem = cartItem;
          }
        });
      
        matchingItem.deliveryOptionsId = deliveryOptionId;
      
        this.saveToStorage();
      }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);