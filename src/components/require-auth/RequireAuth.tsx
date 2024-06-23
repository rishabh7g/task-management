import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "src/context/auth-context";
import { RoutePath } from "src/routes";

export const RequireAuth = () => {
  const { authState } = useAuth();
  const location = useLocation();
  const isAuthenticated = !!authState.accessToken;
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={RoutePath.Login} state={{ from: location }} replace />;
  }
};
