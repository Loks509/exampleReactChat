import { Box, CircularProgress, List, ListItem } from "@mui/material";
import useEffectAuth from "../../../core/hooks/useEffectAuth"
import { getChats } from "../../../store/chats/asyncReducer";
import { useAppDispatch, useAppSelector } from "../../../store/useRedux"
import ChatItem from "./ChatItem";
import ModalCreateChat from "../ModalCreateChat/ModalCreateChat";
import ButtonSave from "../../UIpackv2/Buttons/ButtonSave/ButtonSave";
import { useEffect, useState } from "react";
import { resetChats } from "../../../store/chats/slice";

export default function Chatlist() {
    const dispatch = useAppDispatch();
    const [isOpen, setOpen] = useState(false);
    const [page, setPage] = useState(2);

    const chats = useAppSelector(state => state.chats.chats);
    const isLoading = useAppSelector(state => state.chats.loadingStatus) === 'loading';

    useEffectAuth(() => {
        dispatch(resetChats())
        dispatch(getChats(1));
    }, [])

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    useEffect(() => {
        const onScrollListener = () => {
            const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

            if (windowRelativeBottom < document.documentElement.clientHeight + 500 && !isLoading) {
                dispatch(getChats(page));
                setPage(page => page + 1);
            }
        }

        window.addEventListener('scroll', onScrollListener);

        return () => {
            window.removeEventListener('scroll', onScrollListener)
        }
    }, [page, document.documentElement.getBoundingClientRect().bottom, document.documentElement.clientHeight])

    return (
        <Box sx={{ marginTop: 1 }}>
            <ButtonSave onClick={handleOpen}>Создать чат</ButtonSave>

            <List>
                {
                    chats.map(item =>
                        <ChatItem itemChat={item} key={item.id} />
                    )
                }
                {isLoading &&
                    <ListItem sx={{ justifyContent: 'center' }}>
                        <CircularProgress />
                    </ListItem>
                }


            </List>
            <ModalCreateChat open={isOpen} handleClose={handleClose} />
        </Box>
    )
}