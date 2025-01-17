import { createSlice } from "@reduxjs/toolkit";
import { initialState, messagesAdapter } from "./initialState";
import { getMessages } from "./asyncReducer";

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers(builder) {

        builder.addCase(getMessages.pending, (state) => {
            state.loadingStatus = 'loading';
        });

        builder.addCase(getMessages.fulfilled, (state, action) => {
            messagesAdapter.addMany(state, action.payload);
            state.loadingStatus = 'idle';
        });
        
        builder.addCase(getMessages.rejected, (state) => {
            state.loadingStatus = 'failed';
        });

    },
})

export default messagesSlice.reducer