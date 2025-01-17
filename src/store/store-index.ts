import userReducer from "./user/userSlice";
import modalAuthSlice from "./modalAuth/slice";

export const reducer = {
    user: userReducer,
    modalAuth: modalAuthSlice,
}