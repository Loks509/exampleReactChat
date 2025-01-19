import { createEntityAdapter, EntityState } from "@reduxjs/toolkit"
import { IitemMessage } from "../messages/type"
import { IthunkFields } from "../store"
import { iUserData } from "../user/type"
import dayjs from "dayjs"

export const chatsAdapter = createEntityAdapter({
    selectId: (itemChat: IitemChat) => itemChat.id,
    sortComparer: (a, b) => dayjs(a.latest_message.created_at).unix() < dayjs(b.latest_message.created_at).unix() ? 1 : -1,
})

export interface IcreateChatRequest {
    message: string,
    user_id2: number,
}

export interface IitemChat {
    id: number,
    user_id1: number,
    user_id2: number,
    created_at: string,
    user1: iUserData,
    user2: iUserData,
    latest_message: IitemMessage
}
export interface IinitialState extends IthunkFields {
    chats: EntityState<IitemChat, number>,
    endChats: boolean,
    selectedChat: IitemChat | null,
}