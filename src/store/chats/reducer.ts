import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { chatsAdapter, IinitialState, IitemChat } from "./type"

const setSelectedChat: CaseReducer<IinitialState, PayloadAction<IitemChat | null>> = (state, action) => {
    state.selectedChat = action.payload
}

const resetChats: CaseReducer<IinitialState> = (state) => {
    chatsAdapter.setAll(state.chats, []);
    state.endChats = false;
}

const setChat: CaseReducer<IinitialState, PayloadAction<IitemChat>> = (state, action) => {
    chatsAdapter.setOne(state.chats, action.payload);
}

export const reducers = { setSelectedChat, resetChats, setChat }