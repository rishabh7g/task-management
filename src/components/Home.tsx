import { Link } from 'react-router-dom';

function Home() {
   return (
      <div>
         <div className='space-x-4'>
            <Link
               to='/tasks'
               className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
            >
               Tasks
            </Link>
            <Link
               to='/calc'
               className='rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700'
            >
               Calculator
            </Link>
            <Link
               to='/counter'
               className='rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-green-700'
            >
               Counter
            </Link>
         </div>
      </div>
   );
}

export default Home;
