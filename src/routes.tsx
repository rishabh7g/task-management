import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const LoginPage = lazy(() => import("src/pages/login-page/LoginPage"));
const RegistrationPage = lazy(
  () => import("src/pages/registration-page/RegistrationPage"),
);
const TaskPage = lazy(() => import("src/pages/task-page/TaskPage"));
const AdminPage = lazy(() => import("src/pages/admin-page/AdminPage"));

export enum RoutePath {
  Login = "/login",
  Register = "/register",
  Home = "/",
  Admin = "/admin",
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
    element: <TaskPage />,
  },
  {
    path: RoutePath.Admin,
    element: <AdminPage />,
  },
];

export default routes;
