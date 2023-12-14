export let cart = JSON.parse(localStorage.getItem('cart'))||
[{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:  2
},
{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2
}];
                 




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
            quantity: 1
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