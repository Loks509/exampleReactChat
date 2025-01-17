import { createAxiosClient } from "./createAxiosClient";
import { getCurrentAccessToken, getCurrentRefreshToken, clearTokens } from "../functionsStorage";
import { logout } from "../ApiAuth/methodsAuth";

const clientLK = createAxiosClient({
    options: {
        baseURL: import.meta.env.VITE_BASE_URL_LK_API,
        timeout: 300000,
        headers: {
            'Content-Type': 'application/json',
        }
    },
    getCurrentAccessToken,
    getCurrentRefreshToken,
    clearTokens,
    logout
})

export { clientLK }