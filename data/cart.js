 export let cart; 
                 
 loadFromStorage();

export function loadFromStorage(){
    cart = JSON.parse(localStorage.getItem('cart'))||
    [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:  2,
        deliveryOptionId: '1'
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2,
        deliveryOptionId: '2'
    }];
}



function saveToStorage(){
    // localStorage can only save strings
    // json.stringify(cart) convert cart to strings 
    // and then we st
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingItem;

    cart.forEach((cartItem)=>{
             if(productId === cartItem.productId){
                    matchingItem = cartItem;
             } 
    });

    if(matchingItem){
            matchingItem.quantity += 1;
    }
    else{
        cart.push({
            productId: productId,
            quantity: 1,
             deliveryOptionId: '1' // for new pdts the default deliveryOptionsId is 1 
        });
    }
    saveToStorage();
    //it will save data to localstorage
}
 
export function removeFromCart(productId){
   //steps
   //1. create a new array
   //2. Loop through the cart 
   //3. Add each product to the new array, except for this productId
   const newCart = [];

   cart.forEach((cartItem)=>{
       if(cartItem.productId !== productId){
              newCart.push(cartItem);
       }
   });

   cart = newCart;
   saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        } 
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    // although matchingItem is a different object but because in js object refer to same address thatswhy it is affecting cart object directly

    saveToStorage();
}