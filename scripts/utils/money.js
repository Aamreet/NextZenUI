export function formatCurrency(priceCents){
       return (priceCents/100).toFixed(2);
}

// syntax for default export

export default formatCurrency;