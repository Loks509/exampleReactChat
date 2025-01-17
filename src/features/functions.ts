export function processAccessToken(accessToken: string) {
    if (accessToken) {
        const payload = accessToken.split('.')[1]
        return JSON.parse(atob(payload))
    } else {
        return {};
    }
}