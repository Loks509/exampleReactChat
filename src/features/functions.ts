//@ts-nocheck временно, надо убирать ошибки

import { days } from "../core/config/config";

export function processAccessToken(accessToken: string) {
    if (accessToken) {
        const payload = accessToken.split('.')[1]
        return JSON.parse(atob(payload))
    } else {
        return {};
    }
}

export function getUnixFromDate(date: Date) {
    return Math.floor(date.getTime() / 1000);
}
export function getDateFromUnix(unix: number) {
    // var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    return new Date(unix * 1000);
}
export function getFormatDateFromUnix(unix: number) {
    return getDateFromUnix(unix).toLocaleDateString("ru-RU");
}
export function getDayWeekFromUnix(unix: number) {
    return days[getDateFromUnix(unix).getDay()];
}

export function getHTMLDateFromUnix(unix: number) {
    return getDateFromUnix(unix).toISOString().split('T')[0];
}

export function getMySQLDateFromJS(date: Date): string {
        return date.getFullYear() + '-' +
        ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getDate()).slice(-2);
}

export function getJSDateFromMySQL(date: string): Date {
    if(date.length > 0){
        return new Date(date);
    }
    return new Date();
}

export function getFormatDateFromMySQL(date: string){
    return getJSDateFromMySQL(date).toLocaleDateString("ru-RU")
}

export function isEmptyObject(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function hasURL(word: string) {
    if (document.location.href.indexOf(word) >= 0) {
        return true;
    } else {
        return false;
    }
}
export function getCurrentDate() {
    return
}

export function getCurrentTimeUnix() {
    return new Date().getTime() / 1000;
}

export function onlyUnique(value: any, index: number, array: any) {
    return array.indexOf(value) === index;
}

export function filterOnlyUniqueByKey(key: string) {
    return (value: any, index: number, array: any) => (
        array.findIndex(it => it[key] === value[key]) === index
    )
}

// export function RenderItem(item: {label?: string, key?: string}, data:Object):any{
//     return (
//         <>
//             <b>{item.label}</b> {data[item.key!]}
//         </>
//     )
// }