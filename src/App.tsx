import { Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "./routes";

const Routes = () => {
  const routing = useRoutes(routes);
  return routing;
};

const App = () => {
  return (
    <main>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <section className="flex min-h-screen items-center justify-center bg-sky-700">
            <Routes />
          </section>
        </Suspense>
      </Router>
    </main>
  );
};

export default App;
