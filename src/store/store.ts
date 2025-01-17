import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./store-index"
import { clientLK } from "../core/Api/ApiData/axiosClientLK";
import { clientApiV2 } from "../core/Api/ApiData/axiosClient";

import { AxiosInstance } from "axios";
import { PLATFORM } from "../core/config/config";

export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: { clientLK, clientApiV2, platform: PLATFORM }
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
        clientLK: AxiosInstance,
        clientApiV2: AxiosInstance,
        platform: number,
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