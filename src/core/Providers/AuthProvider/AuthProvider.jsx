import React, { createContext } from "react";
import { useDispatch } from "react-redux";

import { getCurrentAccessToken } from "../../Api/functionsStorage";
import { processAccessToken } from "../../../features/functions";
import { setUser } from "../../../store/slices/userSlice";

const authContext = createContext({});

export default function AuthProvider({ children }) {

    const accessToken = getCurrentAccessToken();
    if(accessToken){
        const dispatch = useDispatch();
        const userData = processAccessToken(accessToken);
        dispatch(setUser(userData));
    }

    //const [user, setUser] = useState({});
    

    return (
        <authContext.Provider value={{ user, setUser }}>
            {children}
        </authContext.Provider>
    )
}