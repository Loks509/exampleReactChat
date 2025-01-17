import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./store-index"
import { clientApi } from "../core/Api/ApiData/axiosClient";

import { AxiosInstance } from "axios";

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: { clientApi }
            }
        })
    ,
});

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export interface IthunkApi {
    dispatch: AppDispatch,
    state: RootState,
    extra: {
        clientApi: AxiosInstance,
    }
}

export type IloadingStatus = 'idle' | 'failed' | 'loading'

export interface IthunkFields {
    loadingStatus: IloadingStatus,
    error: string | null,
}

export interface IresponsePaginator {
    current_page: number,
    from: number,
    last_page: number,
    per_page: number,
    to: number,
    total: number,
}

export interface IpayloadApiWithPaginator<TypeData> {
    data: TypeData,
    paginator: IresponsePaginator,
    status: 'Successfully' | 'Eror',
}

export interface IpayloadApiWithoutPaginator<TypeData> {
    data: TypeData,
    status: 'Successfully' | 'Eror',
}

export interface IrequestPaginator {
    per_page?: number,
    page?: number,
    order?: string,
}

export type IrequestWithPaginator<TypeRequest> = IrequestPaginator & TypeRequest