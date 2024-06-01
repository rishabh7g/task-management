import { useState } from 'react';
import LogoSrc from '../logo.svg';
import ReactImgSrc from '../react.png';

export const Counter = () => {
   const [count, setCount] = useState(0);
   return (
      <div>
         <h1 className='text-blue-400'>Hey, hola! -- {process.env.NODE_ENV}</h1>
         <h3 className='text-lg font-black'>
            Update the count and edit src/App.tsx, state is preserved
         </h3>
         <button
            className='bg-blue-300 p-2 py-1'
            onClick={() => setCount((c) => c + 1)}
         >
            Count - {count}
         </button>
         <img src={ReactImgSrc} alt='react' />
         <img src={LogoSrc} alt='logo' />
      </div>
   );
};
