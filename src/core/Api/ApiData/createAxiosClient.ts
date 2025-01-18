//@ts-nocheck временно, надо убирать ошибки

import axios from "axios";

import toast from "react-hot-toast";

export function createAxiosClient({
    options,
    getCurrentAccessToken,
    clearTokens,
    logout,
}) {
    const client = axios.create(options);

    client.interceptors.request.use(
        (config) => {
            const token = getCurrentAccessToken();

            if (token) {
                config.headers.Authorization = "Bearer " + token;
            }

            return config;
        }
    );

    client.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            toast.error("Произошла ошибка. " + error.message)

            return Promise.reject(error);
        }
    );

    return client;
}