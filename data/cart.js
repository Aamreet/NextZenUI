export const cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",// we are not saving image of pdt or other details in cart because using the productd we will search the product form products
    // this technique is known as de-duplicating or normalizing the data
    quantity:  2
},
{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2
}];


export function addToCart(productId){
    let matchingItem;

    cart.forEach((cartItem)=>{
             if(productId === cartItem.productId){
                    matchingItem = cartItem;
             } 
    });

    if(matchingItem){
            matchingItem.Quntity += 1;
    }
    else{
        cart.push({
            productId: productId,
            quantity: 1
        });
    }
}