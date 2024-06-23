export const apiRoutes = {
  createLoginUrl: () => process.env.REACT_APP_AUTH_API_BASE_URL + "/login",
  createRegisterUrl: () =>
    process.env.REACT_APP_AUTH_API_BASE_URL + "/register",
  createTaskAddUrl: () => "/tasks",
};
