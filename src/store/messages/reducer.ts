import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { IeditingMessage, IinitialState } from "./type";
import { initialStateEditingMessage } from "./initialState";

const setEditingMessage: CaseReducer<IinitialState, PayloadAction<IeditingMessage>> = (state, action) => {
    state.editingMessage = action.payload
}

const unsetEditingMessage: CaseReducer<IinitialState> = (state) => {
    state.editingMessage = initialStateEditingMessage
}

export const reducers = { setEditingMessage, unsetEditingMessage }