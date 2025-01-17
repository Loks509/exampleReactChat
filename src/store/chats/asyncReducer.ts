import { IpayloadApiWithoutPaginator } from "../store";
import { createAppAsyncThunk } from "../useRedux";
import { IitemChat } from "./type";

export const getChats = createAppAsyncThunk('chats/getChats',
    async (user_id: number | undefined, thunkApi) => {
        return ((await import("./examples/chats.json")).default);
        return (await thunkApi.extra.clientApi.get<IpayloadApiWithoutPaginator<IitemChat[]>>('chat',
            { params: { user_id: user_id || thunkApi.getState().user.id } }
        )).data.data;
    }
)

export const deleteChats = createAppAsyncThunk('chats/deleteChats',
    async (chatId: number, thunkApi) => {
        return (await thunkApi.extra.clientApi.delete<IpayloadApiWithoutPaginator<IitemChat[]>>(`chat/${chatId}`)).data.data;
    }
)

//TODO написать создание чата
//TODO написать удаление чата