import { RenderOptions, render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'src/context/auth-context';
import { AuthState } from 'src/context/auth-context.types';

const renderWithProvider = (
    ui: React.ReactElement,
    initialAuthState?: AuthState,
    renderOptions?: RenderOptions,
) => {
    return render(
        <Router>
            <AuthProvider initialAuthState={initialAuthState}>
                {ui}
            </AuthProvider>
        </Router>,
        renderOptions,
    );
};

export { renderWithProvider };
export * from '@testing-library/react';
export * from '@testing-library/user-event';
