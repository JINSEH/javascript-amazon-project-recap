import {formatCurrency} from '../scripts/utils/money.js'

export function getProduct(productId) {
  let matchingItem;
    products.forEach((product) => {
      if (productId === product.id) {
        matchingItem = product;
      }})
    return matchingItem;
  }

class Products {
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`
  }

  extraInfoHTML() {
    return '';
  }
}

class Clothing extends Products {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }


  extraInfoHTML() {
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size Chart
      </a>
    `;
  }
};

class Appliance extends Products {
  instructionsLink;
  warrantyLink;
  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink; 
  };

  extraInfoHTML() {
    return `
    <a href="${this.instructionsLink}" target = "_blank">Instructions</a>
    <a href="${this.warrantyLink}" target = "_blank">Warranty</a>`
  }
};

export let products = [];

export function loadProductsFetch() {
  const promise = fetch(
    'https://supersimplebackend.dev/products'
  ).then((response) => {
    return response.json();
  }).then((productsData) => {
    products = productsData.map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }
      else if (productDetails.type === 'appliance') {
        return new Appliance(productDetails);
      }
      return new Products(productDetails);
    });

    console.log('load products');
  });

  return promise;
};

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        }
        else if (productDetails.type === 'appliance') {
          return new Appliance(productDetails);
        }
        return new Products(productDetails);
      });

      console.log('load products');

      fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
};