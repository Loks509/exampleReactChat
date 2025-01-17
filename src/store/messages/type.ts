import { createEntityAdapter, EntityState } from "@reduxjs/toolkit"
import { IitemChat } from "../chats/type"
import { IthunkFields } from "../store"
import dayjs from "dayjs"

export const messagesAdapter = createEntityAdapter({
    selectId: (message: IitemMessage) => message.id,
    sortComparer: (a, b) => dayjs(a.created_at).millisecond() < dayjs(b.created_at).millisecond() ? 1 : -1
})

export interface IitemMessage {
    id: number,
    message: string,
    chat_id: number,
    viewed_at: string | null,
    created_at: string,
    updated_at: string,
}

export interface IinitialState extends IthunkFields {
    chatInfo?: IitemChat,
    messages: EntityState<IitemMessage, number>
}