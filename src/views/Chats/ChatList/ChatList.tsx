import { Backdrop, Box, CircularProgress, List } from "@mui/material";
import useEffectAuth from "../../../core/hooks/useEffectAuth"
import { getChats } from "../../../store/chats/asyncReducer";
import { useAppDispatch, useAppSelector } from "../../../store/useRedux"
import ChatItem from "./ChatItem";
import ModalCreateChat from "../ModalCreateChat/ModalCreateChat";
import ButtonSave from "../../UIpackv2/Buttons/ButtonSave/ButtonSave";
import { useState } from "react";

export default function Chatlist() {
    const dispatch = useAppDispatch();
    const [isOpen, setOpen] = useState(false);

    const chats = useAppSelector(state => state.chats.chats);
    const isLoading = useAppSelector(state => state.chats.loadingStatus) === 'loading';

    useEffectAuth(() => {
        dispatch(getChats());
    }, [])

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <Box sx={{ marginTop: 1 }}>
            <ButtonSave onClick={handleOpen}>Создать чат</ButtonSave>
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
            <ModalCreateChat open={isOpen} handleClose={handleClose} />
        </Box>
    )
}