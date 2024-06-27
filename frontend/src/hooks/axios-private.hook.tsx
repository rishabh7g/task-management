import { HttpStatusCode } from 'axios';
import { useEffect } from 'react';
import { useAuth } from 'src/context/auth-context';
import { useRefreshToken } from 'src/hooks/refresh-token.hook';
import { apiClientPrivate } from 'src/services/api/api-service';

export const useAxiosPrivate = () => {
    const { fetchRefreshToken } = useRefreshToken();
    const { authState, logoutUser } = useAuth();

    useEffect(() => {
        const requestIntercept = apiClientPrivate.interceptors.request.use(
            (config) => {
                const isFreshRequest = !config.headers['Authorization'];
                if (isFreshRequest) {
                    config.headers['Authorization'] =
                        `Bearer ${authState.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseIntercept = apiClientPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const previousRequest = error.config;
                const isResponseForbidden =
                    error.response?.status === HttpStatusCode.Forbidden;
                const isRetryFirstAttempt = !previousRequest.sent;
                const shouldRetryRequest =
                    isResponseForbidden && isRetryFirstAttempt;
                if (shouldRetryRequest) {
                    previousRequest.sent = true;
                    const newAccessToken = await fetchRefreshToken();
                    console.log("🚀 ~ newAccessToken:", newAccessToken)
                    const isNewAccessTokenValid = !!newAccessToken;
                    if (isNewAccessTokenValid) {
                        previousRequest.headers['Authorization'] =
                            `Bearer ${newAccessToken}`;
                        return apiClientPrivate(previousRequest);
                    } else {
                        logoutUser();
                        return Promise.reject(error);
                    }
                }
                return Promise.reject(error);
            },
        );

        return () => {
            apiClientPrivate.interceptors.request.eject(requestIntercept);
            apiClientPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [authState, fetchRefreshToken, logoutUser]);

    return { apiClientPrivate };
};
