import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { AuthProvider } from 'src/context/auth-context';
import { store } from 'src/store/store';
import { App } from './App';
import './index.css';

const isEnvProd = process.env.NODE_ENV === 'production';

if (isEnvProd) {
    disableReactDevTools();
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <Provider store={store}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Provider>,
);
