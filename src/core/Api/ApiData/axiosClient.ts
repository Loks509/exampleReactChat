import { createAxiosClient } from "./createAxiosClient";
import { getCurrentAccessToken, getCurrentRefreshToken, clearTokens } from "../functionsStorage";
import { logout } from "../ApiAuth/methodsAuth";

const clientApiV2 = createAxiosClient({
    options: {
        baseURL: import.meta.env.VITE_BASE_URL_API_V2,
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

export { clientApiV2 }