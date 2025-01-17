import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { getMessages } from "./asyncReducer";
import { messagesAdapter } from "./type";

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
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

    },
})

export default messagesSlice.reducer