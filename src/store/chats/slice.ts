import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { getChat, getChats } from "./asyncReducer";
import { reducers } from "./reducer";
import { chatsAdapter } from "./type";

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: reducers,
    extraReducers(builder) {
        builder.addCase(getChats.pending, (state) => {
            state.loadingStatus = 'loading';
        });

        builder.addCase(getChats.fulfilled, (state, action) => {
            if(action.payload.length == 0){
                state.endChats = true;
            }
            chatsAdapter.setMany(state.chats, action.payload)
            state.loadingStatus = 'idle';
        });

        builder.addCase(getChats.rejected, (state) => {
            state.loadingStatus = 'failed';
        });

        builder.addCase(getChat.fulfilled, (state, action) => {
            state.selectedChat = action.payload;
        });

    },
})

export default chatsSlice.reducer
export const { setSelectedChat, resetChats } = chatsSlice.actions