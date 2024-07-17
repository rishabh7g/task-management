import { HttpStatusCode } from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiClientPrivate } from 'src/services/api/api-service';
import { refreshToken, userSelectors } from 'src/store/slices/user-slice';
import { useAppDispatch } from 'src/store/store';

export const useAxiosPrivate = () => {
    const accessToken = useSelector(userSelectors.getAccessToken);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const requestIntercept = apiClientPrivate.interceptors.request.use(
            (config) => {
                const isFreshRequest = !config.headers['Authorization'];
                if (isFreshRequest) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
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
                    const newAccessToken = await dispatch(refreshToken()).then(
                        (response) => {
                            const payload = response.payload as unknown as {
                                accessToken: string;
                            };
                            return payload.accessToken;
                        },
                    );
                    if (newAccessToken) {
                        previousRequest.headers['Authorization'] =
                            `Bearer ${newAccessToken}`;
                        return apiClientPrivate(previousRequest);
                    }
                    return Promise.reject(error);
                }
                return Promise.reject(error);
            },
        );

        return () => {
            apiClientPrivate.interceptors.request.eject(requestIntercept);
            apiClientPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken, dispatch]);

    return { apiClientPrivate };
};
