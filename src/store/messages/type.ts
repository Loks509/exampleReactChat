import { createEntityAdapter, EntityState } from "@reduxjs/toolkit"
import { IitemChat } from "../chats/type"
import { IloadingStatus, IthunkFields } from "../store"
import dayjs from "dayjs"

export const messagesAdapter = createEntityAdapter({
    selectId: (message: IitemMessage) => message.id,
    sortComparer: (a, b) => dayjs(a.created_at).millisecond() < dayjs(b.created_at).millisecond() ? 1 : -1
})

export interface IeditingMessage {
    message: string,
    id?: number
}

export interface IitemMessage {
    id: number,
    message: string,
    chat_id: number,
    user_id: number,
    viewed_at: string | null,
    created_at: string,
    updated_at: string,
}

export interface IinitialState extends IthunkFields {
    chatInfo?: IitemChat,
    endMessages: boolean,
    loadingStatusEditing: IloadingStatus,
    editingMessage: IeditingMessage,
    messages: EntityState<IitemMessage, number>
}