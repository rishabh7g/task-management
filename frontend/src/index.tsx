import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from 'src/context/auth-context';
import { App } from './App';
import './index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
);
