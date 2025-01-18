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