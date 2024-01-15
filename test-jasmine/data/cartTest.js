import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('Test suite: addToCart', ()=>{
   
    it('adds a new product to the cart', ()=>{
        // spyOn returns an object and this object has and methode this and method also return an object with method callFake()
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            //we override what original getItem do with whatever code is written inside this 
             
            return JSON.stringify([]);// as localStorage only support json format string
        });
        spyOn(localStorage, 'setItem'); // this means that now if some method below it will use localStorage.setItem then it will be replace by this mock which will do nothing 
        // console.log(localStorage.getItem('cart'));
        // we are getting an empty array but still cart.lenght == 2 because 
        // first we import cart and as we import cart it is already loaded in local storage
        // and then we mock, so because of the order in which we mock it is not working
  
        // one way to solve the above problem is that after we mock we should reload the cart
        
        loadFromStorage();// now we have reloaded the cart, so now loacalStorage.getItem() will return an empty array basically now our mock will run
        addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
        expect(cart.length).toEqual(1);
        // let's check if addToCart ever called localStorage.setItem or not
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
        // test if localStorage.setItem is called 1 time or not
        // So after we mock a method we can check how many times that mehtod is called 
        // Home-work -> what values this mocked method received ??
        expect(cart[0].productId).toEqual('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
        expect(cart[0].quantity).toEqual(1);
    }); 

    it('adds an existing product to the cart', ()=>{
            // A mock only last for 1 test, so for every other test we need to mock it again
            spyOn(localStorage, 'setItem');
            spyOn(localStorage, 'getItem').and.callFake(()=>{
                return JSON.stringify([{
                    productId:'8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
                    quantity: 1,
                    deliveryOptionId: '1'
                }]);
            });
            loadFromStorage();
            addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
            expect(cart.length).toEqual(1);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
            expect(cart[0].productId).toEqual('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
            expect(cart[0].quantity).toEqual(2);
        });
    
});