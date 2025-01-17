import { createSlice } from "@reduxjs/toolkit";
import { userInitialState } from "./userInitialState";
import { userReducer } from "./userReducer";

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: userReducer,
})

export const { setUserData, setUserId, unsetUser } = userSlice.actions
export default userSlice.reducer