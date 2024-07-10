import React from 'react';
import { Header } from 'src/components/header/Header';
import { renderWithProvider, screen } from 'src/util/test-util';

const LOGOUT_REGEX = /logout/i;
const HOME_REGEX = /home/i;
const ADMIN_REGEX = /admin/i;

describe('<Header />', () => {
    test('renders without crashing', () => {
        renderWithProvider(<Header />);
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    test('displays the logo and application name', () => {
        renderWithProvider(<Header />);
        expect(
            screen.getByAltText('Task Management App logo'),
        ).toBeInTheDocument();
        expect(screen.getByText('Task Management App')).toBeInTheDocument();
    });

    test('renders navigation links', () => {
        renderWithProvider(<Header />);
        expect(
            screen.getByRole('link', { name: HOME_REGEX }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: ADMIN_REGEX }),
        ).toBeInTheDocument();
    });

    test('does not render the logout button when user is not logged in', () => {
        renderWithProvider(<Header />);
        expect(
            screen.queryByRole('button', { name: LOGOUT_REGEX }),
        ).not.toBeInTheDocument();
    });
});
