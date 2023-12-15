export function formatCurrency(priceCents){
       // return (priceCents/100).toFixed(2);
       // toFixed() has this issue for no like following->
       // 6.005.toFixed() = 6.00 but it should be 6.01
       return (Math.round(priceCents)/100).toFixed(2);
       
}

// syntax for default export

export default formatCurrency;