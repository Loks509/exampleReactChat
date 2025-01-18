import { useParams } from "react-router-dom";
import useEffectAuth from "../../../core/hooks/useEffectAuth";
import { useAppDispatch, useAppSelector } from "../../../store/useRedux";
import { getMessages } from "../../../store/messages/asyncReducer";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { useBreadcrumbs } from "../../../core/Providers/BreadcrumbsProvider/BreadcrumbsProvider";
import { getChat } from "../../../store/chats/asyncReducer";
import { useMemo } from "react";
import { setMessagesAll } from "../../../store/messages/slice";
import { setSelectedChat } from "../../../store/chats/slice";
import Echo from 'laravel-echo'


export default function SelectedChat() {
    const { chatId } = useParams<'chatId'>();
    const dispatch = useAppDispatch()

    const userId = useAppSelector(state => state.user.id);
    const selectedChat = useAppSelector(state => state.chats.selectedChat);

    const isLoading = useAppSelector(state => state.messages.loadingStatus) === 'loading';

    const nameChat = useMemo(() =>
        userId == selectedChat?.user1.id ? selectedChat?.user2.name : selectedChat?.user1.name,
        [userId, selectedChat?.user1.name, selectedChat?.user2.name]
    ) || '';

    useEffectAuth(() => {
        const echo = new Echo({
            broadcaster: 'reverb',
            key: 'dc3kzqgkdtak2brpw91d',
            wsHost: '138.124.55.208',
            wsPort: 9001,
            forceTLS: false,
        });

        /*@ts-ignore */
        echo.channel('chat-channel').listen('.message-sent', (data) => {
            console.log('Received event:', data.channel);
        });

        /*@ts-ignore */
        echo.channel('chat-channel').listenToAll((data) => {
            console.log('Received event:', data.channel);
        })

        if (chatId) {
            dispatch(getMessages({ chat_id: Number(chatId) }))
            dispatch(getChat(Number(chatId)));
        }

        return () => {
            dispatch(setMessagesAll([]));
            dispatch(setSelectedChat(null));
        }
    }, [chatId])

    useBreadcrumbs({ label: nameChat, depth: 3 })


    return (
        <>
            {isLoading && selectedChat === null &&
                <Backdrop open>
                    <CircularProgress />
                </Backdrop>
            }
            {!!chatId && selectedChat !== null &&
                <Box>
                    <ChatHeader nameChat={nameChat} />
                    <Box sx={{ height: '55px' }} />
                    <ChatMessages />
                    <Box sx={{ height: '80px' }} />
                    <ChatFooter chatId={Number(chatId)} />
                </Box>
            }
            {!chatId &&
                <Box>Такой чат отсутствует!</Box>
            }
        </>

    )
}