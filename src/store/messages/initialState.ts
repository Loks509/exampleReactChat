import { createEntityAdapter } from "@reduxjs/toolkit";
import { IinitialState, IitemMessage } from "./type";
import dayjs from 'dayjs';

export const messagesAdapter = createEntityAdapter({
    selectId: (message: IitemMessage) => message.id,
    sortComparer: (a, b) => dayjs(a.created_at).millisecond() < dayjs(b.created_at).millisecond() ? 1 : -1
})

export const initialState = messagesAdapter.getInitialState<IinitialState>({
    loadingStatus: 'idle',
    error: null,
    chatInfo: undefined,
});