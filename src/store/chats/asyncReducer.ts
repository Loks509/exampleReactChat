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

//TODO написать создание чата
//TODO написать удаление чата