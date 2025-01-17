import { CaseReducer } from "@reduxjs/toolkit";
import { IinitialState } from "./type";

const showModal: CaseReducer<IinitialState> = (state, _) => {
    state.isShow = true
}

const hideModal: CaseReducer<IinitialState> = (state, _) => {
    state.isShow = false
}

export const modalAuthReducer = {showModal, hideModal}

