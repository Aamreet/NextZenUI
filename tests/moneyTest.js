import {formatCurrency} from '../scripts/utils/money.js';
console.log("Test Suit: Related to format Currency");

console.log("Test1: Conversion of currency");
if(formatCurrency(2095) === '20.95'){
     console.log("passed");
}
else{
    console.log("failed");
}

console.log("Test2: Format of 0");
if(formatCurrency(0) === '0.00'){
    console.log("passed");
}
else{
   console.log("failed");
}
