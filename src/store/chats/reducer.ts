import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"
import { IinitialState, IitemChat } from "./type"

const setSelectedChat: CaseReducer<IinitialState, PayloadAction<IitemChat | null>> = (state, action) => {
    state.selectedChat = action.payload
}

export const reducers = { setSelectedChat }