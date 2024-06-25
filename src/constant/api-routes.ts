export const apiRoutes = {
    createRefreshTokenUrl: () => '/refresh-token',
    createLoginUrl: () => '/login',
    createLogoutUrl: () => '/logout',
    createRegisterUrl: () => '/register',
    createTaskAddUrl: () => '/tasks',
    createTaskDeleteUrl: (taskId: string) => `/tasks/${taskId}`,
    createTaskEditUrl: (taskId: string) => `/tasks/${taskId}`,
};
