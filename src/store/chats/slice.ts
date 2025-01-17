import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { getChats } from "./asyncReducer";

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {},
    extraReducers(builder) {

        builder.addCase(getChats.pending, (state) => {
            state.loadingStatus = 'loading';
        });

        builder.addCase(getChats.fulfilled, (state, action) => {
            state.chats = action.payload;
            state.loadingStatus = 'idle';
        });
        
        builder.addCase(getChats.rejected, (state) => {
            state.loadingStatus = 'failed';
        });

    },
})

export default chatsSlice.reducer