/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import axios, { AxiosInstance } from 'axios';

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
