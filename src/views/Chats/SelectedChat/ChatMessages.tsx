import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/useRedux";
import { messagesSelectors } from "../../../store/messages/selectors";
import MessageItem from "./MessageItem";
import { useEffect, useRef, useState } from "react";
import ActionWithMessage from "./ActionWithMessage";
import { IitemMessage } from "../../../store/messages/type";
import { getMessages } from "../../../store/messages/asyncReducer";
import useEffectAuth from "../../../core/hooks/useEffectAuth";
import { setMessage } from "../../../store/messages/slice";
import Echo from 'laravel-echo'

interface ChatMessagesProps {
    chatId: number
}

export default function ChatMessages(props: ChatMessagesProps) {
    const dispatch = useAppDispatch()
    const isScroll = useRef(true);

    const endMessagesRef = useRef<HTMLDivElement | null>(null);
    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const [contextMessage, setContextMessage] = useState<IitemMessage | null>(null)

    const messages = useAppSelector(messagesSelectors.selectAll);
    const isLoading = useAppSelector(state => state.messages.loadingStatus) === 'loading';
    const endMessages = useAppSelector(state => state.messages.endMessages);

    useEffect(() => {
        if (isScroll.current && messages.length > 0) {
            endMessagesRef.current?.scrollIntoView({ behavior: 'auto' });
            isScroll.current = false;
        }
    }, [messages, isScroll])

    useEffectAuth(() => {
        if (props.chatId > 0) {
            const onNewMessage = (data: { message: IitemMessage }) => {
                console.log(data);
                dispatch(setMessage(data.message))
            }


            const echo = new Echo({
                broadcaster: 'reverb',
                key: 'dc3kzqgkdtak2brpw91d',
                wsHost: '138.124.55.208',
                wsPort: 9001,
                forceTLS: false,
                enabledTransports: ['ws']
            });

            echo.channel(`last-message-${props.chatId}`)
                .listen('.update-last-message', onNewMessage);
        }
    }, [])


    useEffect(() => {
        const onScrollListener = () => {
            if (window.scrollY < 1000 && !isLoading && !endMessages) {
                dispatch(getMessages({ chat_id: props.chatId, last_id: messages[0].id }))
            }
        }

        window.addEventListener('scroll', onScrollListener);

        return () => {
            window.removeEventListener('scroll', onScrollListener)
        }
    }, [isLoading, dispatch, getMessages, props.chatId, messages])

    const handleContextMenu = (event: React.MouseEvent, message: IitemMessage) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                :
                null,
        );

        setContextMessage(message);
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    return (
        <Box>
            {messages.map(it =>
                <MessageItem itemMessage={it} key={it.id} onContextMenu={event => handleContextMenu(event, it)} />
            )}

            <ActionWithMessage handleClose={handleClose} contextMenu={contextMenu} targetMessage={contextMessage} />
            <div ref={endMessagesRef}></div>
        </Box>
    )
}