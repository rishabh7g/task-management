import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const LoginPage = lazy(() => import("src/pages/LoginPage"));
const RegistrationPage = lazy(
  () => import("src/pages/registration-page/RegistrationPage"),
);
const TaskManagementPage = lazy(() => import("src/pages/TaskManagementPage"));

export enum RoutePath {
  Home = "/",
  Register = "/register",
  Tasks = "/tasks",
}

const routes: RouteObject[] = [
  {
    path: RoutePath.Home,
    element: <LoginPage />,
  },
  {
    path: RoutePath.Register,
    element: <RegistrationPage />,
  },
  {
    path: RoutePath.Tasks,
    element: <TaskManagementPage />,
  },
];

export default routes;
