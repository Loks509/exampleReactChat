import { IpayloadApiWithoutPaginator } from "../store";
import { createAppAsyncThunk } from "../useRedux";
import { IitemMessage } from "./type";

export const getMessages = createAppAsyncThunk('messages/getMessages',
    async (_, thunkApi) => {
        const userId = thunkApi.getState().user.id;
        return (await thunkApi.extra.clientApi.get<IpayloadApiWithoutPaginator<IitemMessage[]>>(`chat/${userId}`)).data.data;
    }
)