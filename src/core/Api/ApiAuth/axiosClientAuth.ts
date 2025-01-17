import { createAxiosClientAuth } from "./createAxiosClientAuth";

export const clientAuth = createAxiosClientAuth({
    options: {
        baseURL: import.meta.env.VITE_BASE_URL_AUTH,
        headers: {
            'Content-Type': 'application/json',
        }
    },
    platform: import.meta.env.VITE_PLATFORM
})