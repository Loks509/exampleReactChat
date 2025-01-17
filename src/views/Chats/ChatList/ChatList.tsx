import { Backdrop, CircularProgress, List } from "@mui/material";
import useEffectAuth from "../../../core/hooks/useEffectAuth"
import { getChats } from "../../../store/chats/asyncReducer";
import { useAppDispatch, useAppSelector } from "../../../store/useRedux"
import ChatItem from "./ChatItem";

export default function Chatlist() {
    const dispatch = useAppDispatch();

    const chats = useAppSelector(state => state.chats.chats);
    const isLoading = useAppSelector(state => state.chats.loadingStatus) === 'loading';

    useEffectAuth(() => {
        dispatch(getChats());
    }, [])

    return (
        <>
            {isLoading &&
                <Backdrop open>
                    <CircularProgress />
                </Backdrop>
            }
            {!isLoading &&
                <List>
                    {
                        chats.map(item =>
                            <ChatItem itemChat={item} key={item.id} />
                        )
                    }
                </List>

            }

        </>
    )
}