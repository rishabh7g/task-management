import { RenderOptions, render as RtlRender } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'src/context/auth-context';

const render = (ui: React.ReactElement, renderOptions?: RenderOptions) => {
    return RtlRender(
        <Router>
            <AuthProvider>{ui}</AuthProvider>
        </Router>,
        renderOptions,
    );
};

// eslint-disable-next-line import/export
export * from '@testing-library/react';
// eslint-disable-next-line import/export
export { render };
