import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from 'src/routes';

export const UnauthorizedPage = () => {
    return (
        <div className='w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                Sorry! You are not authorized
            </h2>
            <p className='text-center'>
                You do not have permission to access this page.
            </p>
            <div className='text-center'>
                <Link
                    to={RoutePath.Home}
                    className='text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500'
                    aria-label='Go back to the home page'
                >
                    Go back to Home
                </Link>
            </div>
        </div>
    );
};
