import React, { Suspense } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "./routes";
import { UserProvider } from "src/context/user.context";

const Routes = () => {
  const routing = useRoutes(routes);
  return routing;
};

const App = () => {
  return (
    <main>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <UserProvider>
            <Routes />
          </UserProvider>
        </Suspense>
      </Router>
    </main>
  );
};

export default App;
