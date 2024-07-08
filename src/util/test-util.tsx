// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/export */
import { RenderOptions, render as rtlRender } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'src/context/auth-context';
import { AuthState } from 'src/context/auth-context.types';

export function renderWithProvider(
    ui: React.ReactElement,
    initialAuthState?: AuthState,
    renderOptions?: RenderOptions,
) {
    return {
        user: userEvent.setup(),
        ...rtlRender(
            <Router>
                <AuthProvider initialAuthState={initialAuthState}>
                    {ui}
                </AuthProvider>
            </Router>,
            renderOptions,
        ),
    };
}

export function render(jsx: ReactElement) {
    return {
        user: userEvent.setup(),
        ...rtlRender(jsx),
    };
}

export * from '@testing-library/react';
export * from '@testing-library/user-event';
