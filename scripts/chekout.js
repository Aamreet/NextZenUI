import {cart, removeFromCart, updateDeliveryOption} from "../data/cart.js";
import {products} from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';// imported an external library
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
// we have imported only one thing this syntax is called Default Export
// in dayjs file they only exproted dayjs function  as default export
// the syntax with curly braces is known as named syntax
import {deliveryOptions} from '../data/deliveryOptions.js'

// hello();

// // console.log(dayjs());

// const today = dayjs();

// const deliveryDate = today.add(7, "days");
// // .add(no of time we want to add, lenght of time we want to add)
// console.log(deliveryDate);
// // in deliveryDate object for $d: we will get date 7 days after the date you enter the website

// console.log(deliveryDate.format('dddd, MMMM D'));
//dddd-> replace it with day of the week
// MMMM -> replace it with month 
// D -> date

let cartSummaryHtml = " ";

cart.forEach((cartItem)=>{
   const productId = cartItem.productId;

   let matchingProduct;

   products.forEach((product) =>{
      if(product.id === productId){
        matchingProduct = product;
      }
   });

  //  console.log(matchingProduct);

   const deliveryOptionId = cartItem.deliveryOptionId;
  // console.log(deliveryOptionId);
   let deliveryOption;

 deliveryOptions.forEach((option)=>{
      if(option.id === deliveryOptionId){
         deliveryOption = option;
      }
 });

//  console.log(deliveryOption);
 const today = dayjs();
 const deliveryDate = today.add(
    deliveryOption.deliveryDays, 'days'
 );    
 const dateString = deliveryDate.format(
   'dddd, MMMM D'
 ); 
//  console.log(dateString);


 cartSummaryHtml +=  `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div> 
    `;

});

// we passed mathingProduct in this function because it is not acessible by this directly
function deliveryOptionsHTML(matchingProduct, cartItem){
  let html = '';

  deliveryOptions.forEach((deliveryOption) =>{
      const today = dayjs();
      const deliveryDate = today.add(
         deliveryOption.deliveryDays, 'days'
      );    
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      ); 

      const priceString = deliveryOption.priceCents === 0
       ? 'FREE'
       : `$${formatCurrency(deliveryOption.priceCents)} - `;
        // console.log(deliveryOption.id);
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        // console.log(deliveryOption.id, cartItem.deliveryOptionId);
        html += `
        
          <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
              ${ isChecked ? 'checked': ''}
              class="delivery-option-input"
              name="${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
        `
  });
  return html;
}

// console.log(cartSummaryHtml);

document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

document.querySelectorAll(".js-delete-link").forEach((link)=>{
    link.addEventListener('click', ()=>{
      // console.log('delete');
       const productId = link.dataset.productId;
      //  console.log(productId);
       removeFromCart(productId);
       // this will remove product from cart only 
      //  console.log(cart);

       //To remove product from page 
       // 1. use dom to get the element
       // 2. use element.remove() method
       const container = document.querySelector(`.js-cart-item-container-${productId}`);
      //  console.log(container);
      container.remove();

      });
});

document.querySelectorAll('.js-delivery-option')
.forEach((element)=>{
  element.addEventListener('click', ()=>{
       const { productId, deliveryOptionId}= element.dataset;
       updateDeliveryOption(productId, deliveryOptionId);
  });
});