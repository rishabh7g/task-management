import { fireEvent, screen } from '@testing-library/react';
import { Header } from 'src/components/header/Header';
import { render } from 'src/util/test-util';

const LOGOUT_REGEX = /logout/i;
const HOME_REGEX = /home/i;
const ADMIN_REGEX = /admin/i;

const mockLogoutUser = jest.fn();

describe('<Header />', () => {
    test('renders without crashing', () => {
        render(<Header />);
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    test('displays the logo and application name', () => {
        render(<Header />);
        expect(
            screen.getByAltText('Task Management App logo'),
        ).toBeInTheDocument();
        expect(screen.getByText('Task Management App')).toBeInTheDocument();
    });

    test('renders navigation links', () => {
        render(<Header />);
        expect(
            screen.getByRole('link', { name: HOME_REGEX }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('link', { name: ADMIN_REGEX }),
        ).toBeInTheDocument();
    });

    test('renders the logout button when user is logged in', () => {
        render(<Header />);
        expect(
            screen.getByRole('button', { name: LOGOUT_REGEX }),
        ).toBeInTheDocument();
    });

    test('does not render the logout button when user is not logged in', () => {
        render(<Header />);
        expect(
            screen.queryByRole('button', { name: LOGOUT_REGEX }),
        ).not.toBeInTheDocument();
    });

    test('calls logoutUser function when logout button is clicked', () => {
        render(<Header />);
        fireEvent.click(screen.getByRole('button', { name: LOGOUT_REGEX }));
        expect(mockLogoutUser).toHaveBeenCalledTimes(1);
    });
});
