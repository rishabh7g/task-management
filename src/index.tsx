import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from 'src/context/auth-context';
import '@testing-library/jest-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
);
