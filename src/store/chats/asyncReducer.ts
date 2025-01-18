import { IpayloadApiWithoutPaginator } from "../store";
import { createAppAsyncThunk } from "../useRedux";
import { IitemChat } from "./type";

export const getChats = createAppAsyncThunk('chats/getChats',
    async (user_id: number | undefined, thunkApi) => {
        return (await thunkApi.extra.clientApi.get<IpayloadApiWithoutPaginator<IitemChat[]>>('chat',
            { params: { user_id: user_id || thunkApi.getState().user.id } }
        )).data.data;
    }
)

export const getChat = createAppAsyncThunk('chats/getChat',
    async (chatId: number, thunkApi) => {
        return (await thunkApi.extra.clientApi.get<IpayloadApiWithoutPaginator<IitemChat[]>>(`chat/${chatId}`)).data.data[0];
    }
)

export const deleteChats = createAppAsyncThunk('chats/deleteChats',
    async (chatId: number, thunkApi) => {
        return (await thunkApi.extra.clientApi.delete<IpayloadApiWithoutPaginator<IitemChat[]>>(`chat/${chatId}`)).data.data;
    }
)

//TODO написать создание чата