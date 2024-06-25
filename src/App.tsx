import { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes';
import { Header } from 'src/components/header/Header';

const Routes = () => {
    const routing = useRoutes(routes);
    return routing;
};

const App = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <main className='flex min-h-screen items-start justify-center bg-cyan-900 pt-40'>
                    <Routes />
                </main>
            </Suspense>
        </Router>
    );
};

export default App;
