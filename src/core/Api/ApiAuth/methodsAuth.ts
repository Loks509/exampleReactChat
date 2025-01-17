import { clientAuth } from "./axiosClientAuth";

import { getCurrentAccessToken, getCurrentRefreshToken, setAccessTokens, setRefreshedTokens, clearTokens } from "../functionsStorage";

import { IpayloadApiWithoutPaginator } from "../../../store/store";
import { ITokenData, ITokens } from "../../../store/user/type";

export function login(login: string, password: string) {
    return clientAuth.post<IpayloadApiWithoutPaginator<ITokenData & ITokens>>(
        "authentication",
        { 'login': login, 'password': password }
    ).then((response) => {
        if (response.data.status == 'Successfully') {
            setAccessTokens(response.data.data.a_token)
            setRefreshedTokens(response.data.data.r_token)
        }
        return response.data;
    })
}

export function logout() {
    return clientAuth.post(
        "logout",
        { 'a_token': getCurrentAccessToken(), 'r_token': getCurrentRefreshToken() }
    ).then(async (resp) => {
        clearTokens();
        const store = (await import("../../../store/store"));
        const unsetUser = (await import("../../../store/user/userSlice"));
        store.store.dispatch(unsetUser.unsetUser());
        return resp;
    });
}

export function updateRefreshToken() {
    return clientAuth.post<IpayloadApiWithoutPaginator<ITokens>>(
        "refresh",
        { 'a_token': getCurrentAccessToken(), 'r_token': getCurrentRefreshToken() }
    ).then((response) => {
        if (response.data.status == 'Successfully') {
            setAccessTokens(response.data.data.a_token)
            setRefreshedTokens(response.data.data.r_token)
        }
        return response;
    });
}


//пока безсполезна
// function checkToken() {
//     return clientAuth.post(
//         "check",
//         { 'a_token': getCurrentAccessToken() }
//     );
// }