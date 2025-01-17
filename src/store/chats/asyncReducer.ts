import { IpayloadApiWithoutPaginator } from "../store";
import { createAppAsyncThunk } from "../useRedux";
import { IcreateChatRequest, IitemChat } from "./type";

export const getChats = createAppAsyncThunk('chats/getChats',
    async (page: number, thunkApi) => {
        return (await thunkApi.extra.clientApi.get<IpayloadApiWithoutPaginator<IitemChat[]>>('chat',
            { params: { page } }
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

export const createChat = createAppAsyncThunk('chats/createChat',
    async (data: IcreateChatRequest, thunkApi) => {
        return (await thunkApi.extra.clientApi.post<IpayloadApiWithoutPaginator<IitemChat>>(`chat`, data)).data.data;
    }
)