import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/useRedux";
import { messagesSelectors } from "../../../store/messages/selectors";
import MessageItem from "./MessageItem";
import { useEffect, useRef, useState } from "react";
import ActionWithMessage from "./ActionWithMessage";
import { IitemMessage } from "../../../store/messages/type";
import { getMessages } from "../../../store/messages/asyncReducer";

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

    useEffect(() => {
        if (isScroll.current && messages.length > 0) {
            endMessagesRef.current?.scrollIntoView({ behavior: 'auto' });
            isScroll.current = false;
        }
    }, [messages, isScroll])


    useEffect(() => {
        const onScrollListener = () => {
            if (window.scrollY < 1000 && !isLoading) {
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


    // const handleScroll = (e) => {
    //     const top = e.target.scrollTop;
    //     const currentScrollHeight = e.target.scrollHeight;
    //     const clientHeight = e.target.clientHeight;

    //     // Check if the user has scrolled to the top
    //     if (top === 0 && !isLoading) {
    //         dispatch(getMessages({ chat_id: Number(chatId), last_id: }))
    //     }
    // };


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