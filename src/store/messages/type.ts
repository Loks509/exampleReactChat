import { IitemChat } from "../chats/type"
import { IthunkFields } from "../store"

export interface IitemMessage {
    id: number,
    message: string,
    chat_id: number,
    viewed_at?: string,
    created_at: string,
    updated_at: string,
}
export interface IinitialState extends IthunkFields {
    chatInfo?: IitemChat
}