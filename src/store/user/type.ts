export interface iUserData {
    id: number,
    name: string,
    email: string,
    email_verified_at?: string,
    created_at: string,
    updated_at: string,
}

export interface IUser extends iUserData {
    isLogin: boolean,
}