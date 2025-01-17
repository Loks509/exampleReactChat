import axios, { CreateAxiosDefaults } from "axios";
import toast from "react-hot-toast";

export function createAxiosClientAuth({
    options,
    platform
}: {
    options: CreateAxiosDefaults,
    platform: number
}) {
    const client = axios.create(options);

    client.interceptors.request.use(
        (config) => {
            config.data['platform'] = String(platform)
            return config;
        },
    );

    client.interceptors.response.use(
        undefined,
        (error) => {
            if (error.status == 429) {
                toast.error("Превышено количество запросов в минуту")
            }
            return Promise.reject(error);
        }
    );
    return client;
}