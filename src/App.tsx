import { Suspense } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './routes';
import { Header } from 'src/components/header/header';

const Routes = () => {
    const routing = useRoutes(routes);
    return routing;
};

const App = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <main className='flex min-h-screen items-start justify-center bg-sky-700 pt-40'>
                    <Routes />
                </main>
            </Suspense>
        </Router>
    );
};

export default App;
