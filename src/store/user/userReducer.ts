import { CaseReducer, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, iUserData, iUserId } from "./type";
import { typeStore, userInitialState } from "./userInitialState";
import { IthunkApi } from "../store";

const setUserData: CaseReducer<typeStore, PayloadAction<iUserData>> = (state, action) => {
    const { firstname, secondname, lastname, dateBirth, rights, image } = action.payload;

    state.firstname = firstname;
    state.secondname = secondname;
    state.lastname = lastname;
    state.dateBirth = dateBirth;
    state.rights = rights;

    state.image = image;

    state.shortName = lastname
        + (firstname ? (" " + firstname.substring(0, 1) + ".") : "")
        + (secondname ? (" " + secondname.substring(0, 1) + ".") : "")
}

const setUserId: CaseReducer<typeStore, PayloadAction<iUserId>> = (state, action) => {
    state.id = action.payload.id;
    state.isLogin = true;
}

const unsetUser: CaseReducer<typeStore> = (_) => {
    return userInitialState;
}

export const userReducer = {
    setUserData, setUserId, unsetUser
}

export const getUsersByName = createAsyncThunk<
    IUser[],
    string,
    IthunkApi
>('user/getUsersByName', async (name, thunkApi) => {
    return (await thunkApi.extra.clientLK.get<IUser[]>('/calendarapi/react/getusersbyname', { params: { name } })).data;
})

export const getStudentsByName = createAsyncThunk<
    IUser[],
    string,
    IthunkApi
>('user/getStudentsByName', async (name, thunkApi) => {
    return (await thunkApi.extra.clientLK.get<IUser[]>('/calendarapi/react/getstudentsbyname', { params: { name } })).data;
})

export const getTeachersByName = createAsyncThunk<
    IUser[],
    string,
    IthunkApi
>('user/getTeachersByName', async (name, thunkApi) => {
    return (await thunkApi.extra.clientLK.get<IUser[]>('/calendarapi/react/getteachersbyname', { params: { name } })).data;
})

export const getUserById = createAsyncThunk<
    IUser | undefined,
    number,
    IthunkApi
>('user/getUserById', async (id, thunkApi) => {
    return (await thunkApi.extra.clientLK.get<IUser[]>('/calendarapi/react/getusersbyid', { params: { id } })).data[0];
})

export const getUsersByIds = createAsyncThunk<
    IUser[] | undefined,
    number[],
    IthunkApi
>('user/getUsersByIds', async (id, thunkApi) => {
    return (await thunkApi.extra.clientLK.get<IUser[]>('/calendarapi/react/getusersbyid', {  params: { id } })).data;
})