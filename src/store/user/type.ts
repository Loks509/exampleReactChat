export interface iUserData {
    id: number,
    name: string,
    email: string,
    email_verified_at?: string,
    created_at: string,
    updated_at: string,
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

export interface IUser extends iUserData {
    isLogin: boolean,
}