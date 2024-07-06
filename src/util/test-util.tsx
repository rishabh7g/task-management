import { RenderOptions, render as RtlRender } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'src/context/auth-context';
import { AuthState } from 'src/context/auth-context.types';

const render = (
    ui: React.ReactElement,
    initialAuthState?: AuthState,
    renderOptions?: RenderOptions,
) => {
    return RtlRender(
        <Router>
            <AuthProvider initialAuthState={initialAuthState}>
                {ui}
            </AuthProvider>
        </Router>,
        renderOptions,
    );
};

// eslint-disable-next-line import/export
export * from '@testing-library/react';
// eslint-disable-next-line import/export
export { render };
