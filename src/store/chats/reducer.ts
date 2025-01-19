import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { chatsAdapter, IinitialState, IitemChat } from "./type"

const setSelectedChat: CaseReducer<IinitialState, PayloadAction<IitemChat | null>> = (state, action) => {
    state.selectedChat = action.payload
}

const resetChats: CaseReducer<IinitialState> = (state) => {
    chatsAdapter.setAll(state.chats, []);
    state.endChats = false;
}

export const reducers = { setSelectedChat, resetChats }