import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoUrl from 'src/assets/task-app.logo.jpg';
import { TertiaryButton } from 'src/components/button/Button';
import { RoutePath } from 'src/routes';
import { logoutUser, userSelectors } from 'src/store/slices/user-slice';
import { useAppDispatch } from 'src/store/store';

export const Header = () => {
    const accessToken = useSelector(userSelectors.getAccessToken);
    const dispatch = useAppDispatch();
    const isUserLoggedIn = !!accessToken;

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <header className='fixed left-0 right-0 top-0 z-50 h-16 bg-sky-600 text-white shadow-md'>
            <div className='mx-auto flex max-w-7xl items-center justify-between p-3'>
                <div className='flex items-center gap-2'>
                    <img
                        src={LogoUrl}
                        alt='Task Management App logo'
                        className='h-10 w-10 rounded-2xl'
                    />
                    <h1
                        className='text-2xl font-bold'
                        aria-label='Task Management App'
                    >
                        Task Management App
                    </h1>
                </div>
                <nav aria-label='Main Navigation'>
                    <ul className='flex items-center gap-6'>
                        <CustomLink
                            to={RoutePath.Home}
                            ariaLabel='Go to Home page'
                            menuLabel='Home'
                        />
                        <CustomLink
                            to={RoutePath.Admin}
                            ariaLabel='Go to Admin page'
                            menuLabel='Admin'
                        />
                        {isUserLoggedIn && (
                            <li>
                                <TertiaryButton
                                    label='Logout'
                                    className='text-white focus:outline-none focus:ring-2 focus:ring-white'
                                    onClick={handleLogout}
                                    aria-label='Logout'
                                />
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

interface CustomLinkProps {
    to: string;
    ariaLabel: string;
    menuLabel: string;
}

const CustomLink = ({ to, ariaLabel, menuLabel }: CustomLinkProps) => (
    <li>
        <Link
            to={to}
            className='hover:underline hover:underline-offset-4 focus:outline-none focus:ring-2 focus:ring-white'
            aria-label={ariaLabel}
        >
            {menuLabel}
        </Link>
    </li>
);
