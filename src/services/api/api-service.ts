/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import axios, { AxiosInstance } from 'axios';

// Create an Axios instance with default configurations
export const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 10000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiClientPrivate: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 10000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
