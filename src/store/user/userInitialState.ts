import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { IUser } from "./type";

export const userAdapter = createEntityAdapter({
    selectId: (user: IUser) => user.id,
    sortComparer: (a, b) => a.firstname.localeCompare(b.firstname)
})

export type typeStore = EntityState<IUser, number> & IUser

export const userInitialState = userAdapter.getInitialState<IUser>({
    id: 0,
    firstname: "",
    secondname: "",
    lastname: "",
    shortName: "",
    dateBirth: "",
    isLogin: false,
})