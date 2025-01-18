function getCurrentAccessToken() {
    return localStorage.getItem("AccessToken");
}

function setAccessTokens(tokens: string) {
    localStorage.setItem('AccessToken', tokens)
}

function clearTokens() {
    localStorage.removeItem('AccessToken');
}

export { getCurrentAccessToken, setAccessTokens, clearTokens }