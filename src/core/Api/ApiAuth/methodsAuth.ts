import { getCurrentAccessToken, setAccessTokens, clearTokens } from "../functionsStorage";

import { IpayloadApiWithoutPaginator } from "../../../store/store";
import { iUserData } from "../../../store/user/type";
import { clientApi } from "../ApiData/axiosClient";

interface responseOnSignInAndSignUp {
    token: string,
    user: iUserData
}

export function signIn(email: string, password: string) {
    return clientApi.post<IpayloadApiWithoutPaginator<responseOnSignInAndSignUp>>(
        "signin",
        { email, password }
    ).then(async (response) => {
        if (response.data.status == 'Successfully') {
            setAccessTokens(response.data.data.token);
            const store = (await import("../../../store/store"));
            const setUserData = (await import("../../../store/user/userSlice")).setUserData;

            store.store.dispatch(setUserData(response.data.data.user))
        }
        return response.data;
    })
}

export function signUp(email: string, password: string, name: string) {
    return clientApi.post<IpayloadApiWithoutPaginator<responseOnSignInAndSignUp>>(
        "signup",
        { email, password, name }
    ).then(async (response) => {
        if (response.data.status == 'Successfully') {
            setAccessTokens(response.data.data.token)
            const store = (await import("../../../store/store"));
            const setUserData = (await import("../../../store/user/userSlice")).setUserData;

            store.store.dispatch(setUserData(response.data.data.user))
        }
        return response.data;
    })
}

export async function logout() {
    return clientApi.post(
        "logout"
    ).then(async (resp) => {
        clearTokens();
        const store = (await import("../../../store/store"));
        const unsetUser = (await import("../../../store/user/userSlice")).unsetUser;
        store.store.dispatch(unsetUser());
        return resp;
    });
}