import { IitemMessage } from "../messages/type"
import { IthunkFields } from "../store"
import { iUserData } from "../user/type"

export interface IitemChat {
    id: string,
    user_id1: number,
    user_id2: number,
    created_at: string,
    user1: iUserData,
    user2: iUserData,
    latest_message: IitemMessage
}
export interface IinitialState extends IthunkFields {
    chats: IitemChat[],
}