export const TIMELAG = 30                                       //временной лаг для обновления токена

export const PLATFORM = 1                                       //клиент react на LK

export const EMPTY_REFRESH = 'Refresh token is missing'

export const INVALID_SIGNATURE = 'Invalid signature'

export const TIMEOUT_ACCESS = 'Access token timeout'

export const selectScheduleType = new Map([
    [1, 'Две недели'],
    [2, 'Две недели с объединением'],
    [3, 'Месяц'],
    [4, 'Пол года'],
    [5, 'По датам'],
]);

export const selectSchedule = [
    {id: 1, name: 'Две недели'},
    {id: 2, name: 'Две недели с объединением'},
    {id: 3, name: 'Месяц'},
    {id: 4, name: 'Пол года'},
    {id: 5, name: 'По датам'},
];

export const timesLessons = [
    {begin: "8:00", end: "9:35"},
    {begin: "9:50", end: "11:25"},
    {begin: "11:40", end: "13:15"},
    {begin: "13:45", end: "15:20"},
    {begin: "15:35", end: "17:10"},
    {begin: "17:25", end: "19:00"},
    {begin: "19:15", end: "20:50"},
    {begin: "21:05", end: "22:35"},
]

export const days = [
    "Понедельник", 
    "Вторник", 
    "Среда", 
    "Четверг", 
    "Пятница", 
    "Суббота",
    "Воскресенье", 
]
