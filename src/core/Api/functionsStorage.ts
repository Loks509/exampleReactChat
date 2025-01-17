function getCurrentAccessToken() {
    return localStorage.getItem("AccessToken");
}

function getCurrentRefreshToken() {
    return localStorage.getItem("RefreshToken");
}

function setRefreshedTokens(tokens: string){
    localStorage.setItem('RefreshToken', tokens)
}

function setAccessTokens(tokens: string){
    localStorage.setItem('AccessToken', tokens)
}

function clearTokens(){
    localStorage.removeItem('RefreshToken');
    localStorage.removeItem('AccessToken');
}

export {getCurrentAccessToken, getCurrentRefreshToken, setRefreshedTokens, setAccessTokens, clearTokens}