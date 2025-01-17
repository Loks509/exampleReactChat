import { IpayloadApiWithoutPaginator } from "../store";
import { createAppAsyncThunk } from "../useRedux";
import { IitemMessage } from "./type";

export const getMessages = createAppAsyncThunk('messages/getMessages',
    async (chatId: number, thunkApi) => {
        return (await import("./examples/messagesOnChat6.json")).default
        return (await thunkApi.extra.clientApi.get<IpayloadApiWithoutPaginator<IitemMessage[]>>(`chat/${chatId}`)).data.data;
    }
)