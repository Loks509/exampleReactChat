import axios, { CreateAxiosDefaults } from "axios";
import toast from "react-hot-toast";

export function createAxiosClientAuth({
    options
}: {
    options: CreateAxiosDefaults
}) {
    const client = axios.create(options);

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