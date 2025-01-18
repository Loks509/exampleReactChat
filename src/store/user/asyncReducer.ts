import { IpayloadApiWithoutPaginator } from "../store";
import { createAppAsyncThunk } from "../useRedux";
import { iUserData } from "./type";

export const getCurrentUser = createAppAsyncThunk('user/getCurrentUser',
    async (_, thunkApi) => {
        return (await thunkApi.extra.clientApi.get<IpayloadApiWithoutPaginator<iUserData>>(`current_user`)).data.data;
    }
)

export const getUserByName = createAppAsyncThunk('user/getUserByName',
    async (name: string, thunkApi) => {
        return (await thunkApi.extra.clientApi.get<IpayloadApiWithoutPaginator<iUserData[]>>(`user`, {
            params: { name }
        })).data.data;
    }
)