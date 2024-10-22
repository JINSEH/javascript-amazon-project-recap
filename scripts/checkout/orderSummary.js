import { cart, removeFromCart, updateQuantity, updateDeliveryOption, calculateCartQuantity } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryoptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

renderCheckoutHeader();

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId
    const matchingItem = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionsId;
    
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);


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
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0
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
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      renderPaymentSummary();
      renderCheckoutHeader();
      renderOrderSummary();
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
        renderPaymentSummary();
      }
    });
  });

  document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      saveQuantityLink(productId);
      renderPaymentSummary();
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
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
};