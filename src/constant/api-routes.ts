export const apiRoutes = {
  createSignInUrl: () => process.env.REACT_APP_AUTH_API_BASE_URL + "/sign-in",
  createSignUpUrl: () => process.env.REACT_APP_AUTH_API_BASE_URL + "/sign-up",
  createTaskAddUrl: () => "/tasks",
};
