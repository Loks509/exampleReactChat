//@ts-nocheck временно, надо убирать ошибки

import axios from "axios";

import { updateRefreshToken } from "../ApiAuth/methodsAuth";

import { INVALID_SIGNATURE, TIMEOUT_ACCESS } from "../../config/config";
import toast from "react-hot-toast";

let failedQueue = [];
let isRefreshing = false;

const processQueue = (error) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });

    failedQueue = [];
};

export function createAxiosClient({
    options,
    getCurrentAccessToken,
    getCurrentRefreshToken,
    clearTokens,
    logout,
}) {
    const client = axios.create(options);

    // Если есть ошибка обрабатываем все запросы в очереди с ошибкой и разлогиниваемся
    const handleError = (error) => {
        processQueue(error);
        logout();
        return Promise.reject(error);
    };

    const runRefresh = (originalRequest) => {
        originalRequest.headers = JSON.parse(
            JSON.stringify(originalRequest.headers || {})
        );

        if (isRefreshing) {
            return new Promise(function (resolve, reject) {
                failedQueue.push({ resolve, reject });
            })
                .then(() => {
                    return client(originalRequest);
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
        }
        isRefreshing = true;
        originalRequest._retry = true;
        return updateRefreshToken()
            .then(() => {
                processQueue(null);
                return client(originalRequest);
            }, handleError)
            .finally(() => {
                isRefreshing = false;
            });
    }

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
            const originalRequest = error.config;

            if (
                error.status === 401 &&
                (
                    error.response?.data?.data?.Error === import.meta.env.VITE_INVALID_SIGNATURE ||
                    error.response?.data?.data?.Error === import.meta.env.VITE_TIMEOUT_ACCESS
                )
            ) {
                if (originalRequest?._retry !== true) {
                    if (getCurrentRefreshToken()) {
                        return runRefresh(originalRequest);
                    } else {
                        clearTokens();
                        return Promise.reject(error);
                    }
                } else {
                    return handleError(error);
                }

            } else if (error.status === 429) {
                toast.error("Превышено количество запросов в минуту")
            } else {
                toast.error("Произошла ошибка. " + error.message)
            }
            
            return Promise.reject(error);
        }
    );

    return client;
}