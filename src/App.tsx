import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './styles.css';
import Calculator from 'src/components/Calculator';
import { Counter } from 'src/components/Counter';
import Home from 'src/components/Home';
import Tasks from 'src/components/Tasks';

export const App = () => (
   <>
      <BrowserRouter>
         <div>
            <nav className='mb-10 flex justify-between bg-amber-400 px-3 py-5'>
               <h1 className='text-2xl font-bold text-blue-900'>
                  React Power House
               </h1>
               <ul className='flex gap-5'>
                  <li>
                     <Link to='/'>Home</Link>
                  </li>
                  <li>
                     <Link to='/tasks'>Tasks</Link>
                  </li>
                  <li>
                     <Link to='/calc'>Calculator</Link>
                  </li>
                  <li>
                     <Link to='/counter'>Counter</Link>
                  </li>
               </ul>
            </nav>

            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/tasks' element={<Tasks />} />
               <Route path='/calc' element={<Calculator />} />
               <Route path='/counter' element={<Counter />} />
            </Routes>
         </div>
      </BrowserRouter>
   </>
);
