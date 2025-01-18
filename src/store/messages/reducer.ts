import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { IeditingMessage, IinitialState, IitemMessage, messagesAdapter } from "./type";
import { initialStateEditingMessage } from "./initialState";

const setEditingMessage: CaseReducer<IinitialState, PayloadAction<IeditingMessage>> = (state, action) => {
    state.editingMessage = action.payload
}

const unsetEditingMessage: CaseReducer<IinitialState> = (state) => {
    state.editingMessage = initialStateEditingMessage
}

const setMessagesAll: CaseReducer<IinitialState, PayloadAction<IitemMessage[]>> = (state, action) => {
    messagesAdapter.setAll(state.messages, action.payload)
}

export const reducers = { setEditingMessage, unsetEditingMessage, setMessagesAll }