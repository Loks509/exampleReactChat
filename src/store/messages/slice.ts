import { createSlice } from "@reduxjs/toolkit";
import { initialState, initialStateEditingMessage } from "./initialState";
import { getMessages, sendMessage } from "./asyncReducer";
import { messagesAdapter } from "./type";
import { reducers } from "./reducer";

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers,
    extraReducers(builder) {

        builder.addCase(getMessages.pending, (state) => {
            state.loadingStatus = 'loading';
        });

        builder.addCase(getMessages.fulfilled, (state, action) => {
            messagesAdapter.addMany(state.messages, action.payload);
            state.loadingStatus = 'idle';
        });

        builder.addCase(getMessages.rejected, (state) => {
            state.loadingStatus = 'failed';
        });

        builder.addCase(sendMessage.pending, (state) => {
            state.loadingStatusEditing = 'loading';
        });

        builder.addCase(sendMessage.fulfilled, (state) => {
            state.editingMessage = initialStateEditingMessage
            state.loadingStatusEditing = 'idle';
        });

        builder.addCase(sendMessage.rejected, (state) => {
            state.loadingStatusEditing = 'failed';
        });
    },
})

export default messagesSlice.reducer
export const { setEditingMessage, unsetEditingMessage, setMessagesAll } = messagesSlice.actions