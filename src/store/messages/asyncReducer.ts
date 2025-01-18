import { IpayloadApiWithoutPaginator } from "../store";
import { createAppAsyncThunk } from "../useRedux";
import { IitemMessage } from "./type";

export const getMessages = createAppAsyncThunk('messages/getMessages',
    async (data: { chat_id: number, last_id?: number }, thunkApi) => {
        return (await thunkApi.extra.clientApi.get<IpayloadApiWithoutPaginator<IitemMessage[]>>(`message`, {
            params: data
        })).data.data;
    }
)

export const sendMessage = createAppAsyncThunk('messages/sendMessage',
    async (data: { chat_id: number, message: string, id?: number }, thunkApi) => {
        if (data.id) {
            return (await thunkApi.extra.clientApi.patch<IpayloadApiWithoutPaginator<{ id: number }>>(`message/${data.id}`, data)).data.data;
        } else {
            return (await thunkApi.extra.clientApi.post<IpayloadApiWithoutPaginator<{ id: number }>>(`message`, data)).data.data;
        }
    }
)

export const deleteMessage = createAppAsyncThunk('messages/deleteMessage',
    async (messageId: number, thunkApi) => {
        return (await thunkApi.extra.clientApi.delete<IpayloadApiWithoutPaginator<IitemMessage[]>>(`message/${messageId}`)).data.data;
    }
)