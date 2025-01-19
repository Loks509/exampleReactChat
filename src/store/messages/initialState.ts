import { IinitialState, messagesAdapter } from "./type";

export const initialStateEditingMessage = { message: ''};

export const initialState: IinitialState = {
    messages: messagesAdapter.getInitialState(),
    loadingStatus: 'idle',
    endMessages: false,
    loadingStatusEditing: 'idle',
    error: null,
    editingMessage: initialStateEditingMessage,
    chatInfo: undefined,
}