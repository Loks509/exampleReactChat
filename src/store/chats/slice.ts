import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { getChat, getChats } from "./asyncReducer";

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

        builder.addCase(getChat.fulfilled, (state, action) => {
            state.selectedChat = action.payload;
            state.loadingStatus = 'idle';
        });

    },
})

export default chatsSlice.reducer