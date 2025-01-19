import { IinitialState } from "./type";

export const initialState: IinitialState = {
    chats: [],
    endChats: false,
    selectedChat: null,
    loadingStatus: 'idle',
    error: null,
}