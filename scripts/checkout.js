import { cart, removeFromCart, updateCartQuantity, updateQuantity, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "../data/deliveryoptions.js";

hello();

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));

updateCartQuantity();

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  let matchingItem;
  products.forEach((product) => {
    if (cartItem.productId === product.id) {
      matchingItem = product;
    }})

  const deliveryOptionId = cartItem.deliveryOptionsId;
  
  let deliveryOption = '';

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');


  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = "${cartItem.productId}">
              Update
            </span>
            <input class="quantity-input" data-product-id = "${cartItem.productId}">
            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id = "${cartItem.productId}">Save</span> 
            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id = "${cartItem.productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingItem, cartItem)}
        </div>
      </div>
    </div>`
})

function deliveryOptionsHTML(matchingItem, cartItem) {
  let html = '';


  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOptions.priceCents === 0
    ? 'FREE'
    : `$${formatCurrency(deliveryOption.priceCents)} -`

    const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

    html += `<div class="delivery-option js-delivery-option" data-product-id = "${matchingItem.id}"
    data-delivery-option-id = "${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="${matchingItem.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
           ${priceString} Shipping
          </div>
        </div>
      </div>`
  });
  return html;
};

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    console.log(cart);


    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    updateCartQuantity();
  })
})

document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');
  })
});

let newQuantity;

document.querySelectorAll('.quantity-input').forEach((inputBar) => {
  inputBar.addEventListener(('keydown'), (event) => {
    if (event.key === 'Enter') {
      const productId = inputBar.dataset.productId;
      saveQuantityLink(productId);
    }
  });
});

document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    saveQuantityLink(productId);
  });
})

function saveQuantityLink(productId) {
  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.classList.remove('is-editing-quantity');
  const inputBar = container.querySelector('.quantity-input');
  const outputQuantity = container.querySelector('.quantity-label');
  newQuantity = inputBar.value;
  outputQuantity.innerHTML = newQuantity;
  updateQuantity(productId, newQuantity, outputQuantity);
  inputBar.value = '';
};

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const {productId, deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});