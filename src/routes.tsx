import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { PersistLogin } from 'src/components/persist-login/PersistLogin';
import { RequireAuth } from 'src/components/require-auth/RequireAuth';
import { UnauthorizedPage } from 'src/pages/unauthorize-page/UnauthorizePage';

const LoginPage = lazy(() =>
    import('src/pages/login-page/LoginPage').then((module) => ({
        default: module.LoginPage,
    })),
);

const RegistrationPage = lazy(() =>
    import('src/pages/registration-page/RegistrationPage').then((module) => ({
        default: module.RegistrationPage,
    })),
);

const TaskPage = lazy(() =>
    import('src/pages/task-page/TaskPage').then((module) => ({
        default: module.TaskPage,
    })),
);

const AdminPage = lazy(() =>
    import('src/pages/admin-page/AdminPage').then((module) => ({
        default: module.AdminPage,
    })),
);

export enum RoutePath {
    Login = '/login',
    Register = '/register',
    Home = '/',
    Admin = '/admin',
    Unauthorized = '/unauthorized',
}

export const routes: RouteObject[] = [
    {
        path: RoutePath.Login,
        element: <LoginPage />,
    },
    {
        path: RoutePath.Register,
        element: <RegistrationPage />,
    },
    {
        path: '/',
        element: <PersistLogin />,
        children: [
            {
                path: RoutePath.Home,
                element: <RequireAuth allowedRoles={['user']} />,
                children: [{ index: true, element: <TaskPage /> }],
            },
            {
                path: RoutePath.Admin,
                element: <RequireAuth allowedRoles={['admin']} />,
                children: [{ index: true, element: <AdminPage /> }],
            },
            {
                path: RoutePath.Unauthorized,
                element: <UnauthorizedPage />,
            },
        ],
    },
];
