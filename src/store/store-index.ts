import userSlice from "./user/userSlice";
import modalAuthSlice from "./modalAuth/slice";
import messagesSlice from "./messages/slice"
import chatsSlice from "./chats/slice"

export const reducer = {
    user: userSlice,
    modalAuth: modalAuthSlice,
    messages: messagesSlice,
    chats: chatsSlice
}