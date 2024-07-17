import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RoutePath } from 'src/routes';
import { userSelectors } from 'src/store/slices/user-slice';

interface RequireAuthProps {
    allowedRoles: string[];
}

export const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
    const accessToken = useSelector(userSelectors.getAccessToken);
    const location = useLocation();

    if (!accessToken) {
        return (
            <Navigate to={RoutePath.Login} state={{ from: location }} replace />
        );
    }

    const { roles } = jwtDecode(accessToken) as { roles: string[] };
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
