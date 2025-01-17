export interface iUserId {
    id: number
}

export interface iUserData {
    firstname: string,
    secondname: string,
    lastname: string,
    dateBirth: string,
    rights?: string,
    image?: string,
    photo?: string,
}

export interface ITokens {
    a_token: string,
    r_token: string,
}

export interface ITokenData {
    sub: number,
    adm: number,
    pssch: number,
    iat: number,
    exta: number,
    extr: number,
}

export interface IUser extends iUserData, iUserId {
    shortName: string,
    isLogin: boolean,
}