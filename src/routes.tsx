import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { RequireAuth } from "src/components/require-auth/RequireAuth";

const LoginPage = lazy(() => import("src/pages/login-page/LoginPage"));
const RegistrationPage = lazy(
  () => import("src/pages/registration-page/RegistrationPage"),
);
const TaskManagementPage = lazy(() => import("src/pages/task-page/TaskPage"));

export enum RoutePath {
  Login = "/login",
  Register = "/register",
  Home = "/",
}

const routes: RouteObject[] = [
  {
    path: RoutePath.Login,
    element: <LoginPage />,
  },
  {
    path: RoutePath.Register,
    element: <RegistrationPage />,
  },
  {
    path: RoutePath.Home,
    element: <RequireAuth />,
    children: [{ index: true, element: <TaskManagementPage /> }],
  },
];

export default routes;
