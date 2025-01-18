import dayjs from "dayjs";

export default function getFormatDateAndTimeFromPostgres(date: string){
    return dayjs(date).format("DD.MM.YYYY HH:mm:ss")
}