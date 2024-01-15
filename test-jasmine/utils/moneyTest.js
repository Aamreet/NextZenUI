import { formatCurrency} from '../../scripts/utils/money.js';

describe('Test Suit: Format Currency', ()=>{
   describe('Test 1: Format of any number', ()=>{
        it('test 1.1: format of 2095', ()=>{
            expect(formatCurrency(2095)).toEqual('20.95');
        });
        it('test 1.2: format of 2205', ()=>{
            expect(formatCurrency(2205)).toEqual('22.05');
        });
   });
   
   it('Test 2: format of 0', ()=>{
    expect(formatCurrency(0)).toEqual('0.00');
   });
 
});