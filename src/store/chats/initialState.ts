import { chatsAdapter, IinitialState } from "./type";

export const initialState: IinitialState = {
    chats: chatsAdapter.getInitialState(),
    endChats: false,
    selectedChat: null,
    loadingStatus: 'idle',
    error: null,
}