import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from 'src/context/auth-context';
import { RoutePath } from 'src/routes';

interface RequireAuthProps {
    allowedRoles: string[];
}

export const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
    const { authState } = useAuth();
    const { accessToken, roles } = authState;
    const location = useLocation();

    if (!accessToken) {
        return (
            <Navigate to={RoutePath.Login} state={{ from: location }} replace />
        );
    }

    const isAllowed = allowedRoles.some((role) => roles.includes(role));
    if (!isAllowed) {
        return (
            <Navigate
                to={RoutePath.Unauthorized}
                state={{ from: location }}
                replace
            />
        );
    }

    return <Outlet />;
};
