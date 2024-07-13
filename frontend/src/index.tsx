import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from 'src/context/auth-context';
import { App } from './App';
import './index.css';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

const isEnvProd = process.env.NODE_ENV === 'production';

if (isEnvProd) {
    disableReactDevTools();
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
);
