import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/useRedux";
import { messagesSelectors } from "../../../store/messages/selectors";
import MessageItem from "./MessageItem";
import { useEffect, useRef, useState } from "react";
import ActionWithMessage from "./ActionWithMessage";
import { IitemMessage } from "../../../store/messages/type";
import { getMessages } from "../../../store/messages/asyncReducer";
import useEffectAuth from "../../../core/hooks/useEffectAuth";
import { setMessage, deleteMessage } from "../../../store/messages/slice";
import { useSocketInstance } from "../../../core/Providers/SocketProvider/SocketProvider";

interface ChatMessagesProps {
    chatId: number
}

export default function ChatMessages(props: ChatMessagesProps) {
    const dispatch = useAppDispatch()
    const isScroll = useRef(true);
    const socketInstance = useSocketInstance();

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

    useEffect(() => {
        endMessagesRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [(messages[messages.length - 1] || {}).id])

    useEffectAuth(() => {
        const onNewMessage = (data: { message: IitemMessage }) => {
            console.debug('create', data);
            dispatch(setMessage(data.message))
        }

        const onDeleteMessage = (data: { message: IitemMessage }) => {
            console.debug('delete', data);
            dispatch(deleteMessage(data.message))
        }

        if (props.chatId > 0 && socketInstance != null) {
            socketInstance.channel(`create-message-${props.chatId}`)
                .listen('.create-message', onNewMessage);

            socketInstance.channel(`change-message-${props.chatId}`)
                .listen('.change-message', onNewMessage);

            socketInstance.channel(`delete-message-${props.chatId}`)
                .listen('.delete-message', onDeleteMessage);

            socketInstance.channel(`watch-message-${props.chatId}`)
                .listen('.watch-message', onNewMessage);
        }

        return () => {
            if (props.chatId > 0 && socketInstance != null) {
                socketInstance.channel(`create-message-${props.chatId}`)
                    .stopListening('.create-message', onNewMessage);

                socketInstance.channel(`change-message-${props.chatId}`)
                    .stopListening('.change-message', onNewMessage);

                socketInstance.channel(`delete-message-${props.chatId}`)
                    .stopListening('.delete-message', onDeleteMessage);

                socketInstance.channel(`watch-message-${props.chatId}`)
                    .stopListening('.watch-message', onNewMessage);
            }
        }
    }, [props.chatId, socketInstance])


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