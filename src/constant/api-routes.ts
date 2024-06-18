export const apiRoutes = {
  createSignInUrl: () => "/sign-in",
  createSignUpUrl: () => "/sign-up",
  createTaskAddUrl: (userId: string) => `/users/${userId}/tasks`,
};
