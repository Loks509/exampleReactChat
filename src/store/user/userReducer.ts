import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { IUser, iUserData } from "./type";
import { userInitialState } from "./userInitialState";

const setUserData: CaseReducer<IUser, PayloadAction<iUserData>> = (state, action) => {
    const { id, name, email, email_verified_at, created_at, updated_at } = action.payload;

    state.id = id;
    state.name = name;
    state.email = email;
    state.email_verified_at = email_verified_at;
    state.created_at = created_at;
    state.updated_at = updated_at;
    state.isLogin = true;
}

const setUserId: CaseReducer<IUser, PayloadAction<number>> = (state, action) => {
    state.id = action.payload;
    state.isLogin = true;
}

const unsetUser: CaseReducer<IUser> = (_) => {
    return userInitialState;
}

export const userReducer = {
    setUserData, setUserId, unsetUser
}