import { IinitialState, messagesAdapter } from "./type";

export const initialState: IinitialState = {
    messages: messagesAdapter.getInitialState(),
    loadingStatus: 'idle',
    error: null,
    chatInfo: undefined,
}