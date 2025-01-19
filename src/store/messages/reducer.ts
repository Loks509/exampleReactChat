import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { IeditingMessage, IinitialState, messagesAdapter } from "./type";
import { initialStateEditingMessage } from "./initialState";

const setEditingMessage: CaseReducer<IinitialState, PayloadAction<IeditingMessage>> = (state, action) => {
    state.editingMessage = action.payload
}

const unsetEditingMessage: CaseReducer<IinitialState> = (state) => {
    state.editingMessage = initialStateEditingMessage
}

const unsetMessagesAll: CaseReducer<IinitialState> = (state) => {
    messagesAdapter.setAll(state.messages, []);
    state.endMessages = false;
}

export const reducers = { setEditingMessage, unsetEditingMessage, unsetMessagesAll }