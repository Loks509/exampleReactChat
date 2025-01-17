import dayjs from "dayjs";

export function processAccessToken(accessToken: string) {
    if (accessToken) {
        const payload = accessToken.split('.')[1]
        return JSON.parse(atob(payload))
    } else {
        return {};
    }
}

export default function getFormatDateAndTimeFromPostgres(date: string){
    return dayjs(date).format("DD.MM.YYYY HH:mm:ss")
}