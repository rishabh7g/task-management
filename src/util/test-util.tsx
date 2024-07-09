// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/export */
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'src/context/auth-context';

interface AppProvidersProps {
    children: React.ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
    return (
        <Router>
            <AuthProvider>{children}</AuthProvider>
        </Router>
    );
};

export function renderWithProvider(ui: React.ReactElement) {
    return {
        user: userEvent.setup(),
        ...render(ui, {
            wrapper: AppProviders,
        }),
    };
}

function customRender(jsx: ReactElement) {
    return {
        user: userEvent.setup(),
        ...render(jsx),
    };
}

export { customRender as render };

export * from '@testing-library/react';
export * from '@testing-library/user-event';
