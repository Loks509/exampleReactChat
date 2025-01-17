import { createSlice } from "@reduxjs/toolkit";
import { userAdapter, userInitialState } from "./userInitialState";
import { getUserById, getUsersByIds, userReducer } from "./userReducer";

export const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: userReducer,
    extraReducers(builder) {
        builder
            .addCase(getUserById.fulfilled, (state, action) => {
                if(action.payload)
                    userAdapter.addOne(state, action.payload);
            })
            .addCase(getUsersByIds.fulfilled, (state, action) => {
                if(action.payload)
                    userAdapter.addMany(state, action.payload);
            })
    },
})

export const { setUserData, setUserId, unsetUser } = userSlice.actions
export default userSlice.reducer