import { Box } from "@mui/material";
import { useAppSelector } from "../../../store/useRedux";
import { messagesSelectors } from "../../../store/messages/selectors";
import MessageItem from "./MessageItem";
import { useEffect, useRef, useState } from "react";
import ActionWithMessage from "./ActionWithMessage";
import { IitemMessage } from "../../../store/messages/type";

export default function ChatMessages() {
    const endMessagesRef = useRef<HTMLDivElement | null>(null);
    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const [contextMessage, setContextMessage] = useState<IitemMessage | null>(null)

    const messages = useAppSelector(messagesSelectors.selectAll);

    useEffect(() => {
        endMessagesRef.current?.scrollIntoView({ behavior: 'auto' })
    }, [])

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
                <MessageItem itemMessage={it} key={it.id} onContextMenu={event => handleContextMenu(event, it)}/>
            )}

            <ActionWithMessage handleClose={handleClose} contextMenu={contextMenu} targetMessage={contextMessage} />
            <div ref={endMessagesRef}></div>
        </Box>
    )
}