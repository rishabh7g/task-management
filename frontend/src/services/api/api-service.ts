/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import axios, { AxiosInstance, HttpStatusCode } from 'axios';

const AXIOS_BASE_CONFIG = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 10000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
};

// Create an Axios instance with default configurations
export const apiClient: AxiosInstance = axios.create(AXIOS_BASE_CONFIG);

export const apiClientPrivate: AxiosInstance = axios.create({
    ...AXIOS_BASE_CONFIG,
    withCredentials: true,
});

export const updateRequestHeaders = (accessToken: string) => {
    apiClientPrivate.interceptors.request.use(
        (config) => {
            const isFreshRequest = !config.headers['Authorization'];
            if (isFreshRequest) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error),
    );
};

export const removeRequestHeaders = () => {
    apiClientPrivate.interceptors.request.use(
        (config) => {
            delete config.headers['Authorization'];
            return config;
        },
        (error) => Promise.reject(error),
    );
};

export const retryForbiddenRequestInterceptor = async (
    generateNewAccessToken: () => Promise<string>,
) => {
    apiClientPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            console.log('🚀 ~ error.config:', error.config);
            const previousRequest = error.config;
            const isResponseForbidden =
                error.response?.status === HttpStatusCode.Forbidden;
            const isRetryFirstAttempt = !previousRequest.sent;
            const shouldRetryRequest =
                isResponseForbidden && isRetryFirstAttempt;
            if (shouldRetryRequest) {
                previousRequest.sent = true;
                const newAccessToken = await generateNewAccessToken();
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
};
