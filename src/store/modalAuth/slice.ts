import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { modalAuthReducer } from "./reducer";

const modalAuthSlice = createSlice({
    name: "modalAuth",
    initialState: initialState,
    reducers: modalAuthReducer
})

export const { showModal, hideModal } = modalAuthSlice.actions
export default modalAuthSlice.reducer