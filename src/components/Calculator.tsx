import React, { useState } from 'react';

function Calculator() {
   const [displayValue, setDisplayValue] = useState('0');
   const [operator, setOperator] = useState<string | null>(null);
   const [previousValue, setPreviousValue] = useState<string | null>(null);

   const handleNumberClick = (value: string) => {
      setDisplayValue((prevValue) =>
         prevValue === '0' ? value : prevValue + value
      );
   };

   const handleOperatorClick = (nextOperator: string) => {
      setOperator(nextOperator);
      setPreviousValue(displayValue);
      setDisplayValue('0');
   };

   const handleEqualsClick = () => {
      if (previousValue && operator) {
         const current = parseFloat(displayValue);
         const prev = parseFloat(previousValue);
         let result = 0;

         switch (operator) {
            case '+':
               result = prev + current;
               break;
            case '-':
               result = prev - current;
               break;
            case '*':
               result = prev * current;
               break;
            case '/':
               result = prev / current;
               break;
         }

         setDisplayValue(result.toString());
         setOperator(null);
         setPreviousValue(null);
      }
   };

   const handleClearClick = () => {
      setDisplayValue('0');
      setOperator(null);
      setPreviousValue(null);
   };

   const buttonStyle =
      'flex items-center justify-center w-20 h-20 rounded-full text-xl font-bold text-white shadow-md focus:outline-none';

   return (
      <div className='calculator rounded-lg bg-gray-900 p-8 shadow-lg'>
         <div
            data-testid='display'
            className='display mb-4 text-right text-4xl text-white'
         >
            {displayValue}
         </div>
         <div className='grid grid-cols-4 gap-2'>
            <button
               className={`${buttonStyle} bg-gray-400 hover:bg-gray-500`}
               onClick={handleClearClick}
            >
               AC
            </button>
            <button className={`${buttonStyle} bg-gray-400 hover:bg-gray-500`}>
               +/-
            </button>
            <button className={`${buttonStyle} bg-gray-400 hover:bg-gray-500`}>
               %
            </button>
            <button
               className={`${buttonStyle} bg-orange-500 hover:bg-orange-600`}
               onClick={() => handleOperatorClick('/')}
            >
               ÷
            </button>
            {Array.from(Array(9).keys()).map((number) => (
               <button
                  key={number + 1}
                  className={`${buttonStyle} bg-gray-700 hover:bg-gray-800`}
                  onClick={() => handleNumberClick((number + 1).toString())}
               >
                  {number + 1}
               </button>
            ))}
            <button
               className={`${buttonStyle} bg-gray-700 hover:bg-gray-800`}
               onClick={() => handleNumberClick('0')}
            >
               0
            </button>
            <button className={`${buttonStyle} bg-gray-700 hover:bg-gray-800`}>
               .
            </button>
            <button
               className={`${buttonStyle} bg-orange-500 hover:bg-orange-600`}
               onClick={handleEqualsClick}
            >
               =
            </button>
            {/* Operator buttons */}
            <button
               className={`${buttonStyle} bg-orange-500 hover:bg-orange-600`}
               onClick={() => handleOperatorClick('*')}
            >
               ×
            </button>
            <button
               className={`${buttonStyle} bg-orange-500 hover:bg-orange-600`}
               onClick={() => handleOperatorClick('-')}
            >
               -
            </button>
            <button
               className={`${buttonStyle} bg-orange-500 hover:bg-orange-600`}
               onClick={() => handleOperatorClick('+')}
            >
               +
            </button>
         </div>
      </div>
   );
}

export default Calculator;
