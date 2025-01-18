import { createSlice } from "@reduxjs/toolkit";
import { userInitialState } from "./userInitialState";
import { userReducer } from "./userReducer";
import { getCurrentUser } from "./asyncReducer";

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: userReducer,
    extraReducers(builder) {
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.isLogin = true
        })
    },
})

export const { setUserData, setUserId, unsetUser } = userSlice.actions
export default userSlice.reducer