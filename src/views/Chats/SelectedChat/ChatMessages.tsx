import { Box } from "@mui/material";
import { useAppSelector } from "../../../store/useRedux";
import { messagesSelectors } from "../../../store/messages/selectors";
import MessageItem from "./MessageItem";
import { useEffect, useRef } from "react";

export default function ChatMessages() {
    const endMessagesRef = useRef<HTMLDivElement | null>(null);

    const messages = useAppSelector(messagesSelectors.selectAll);

    useEffect(() => {
        endMessagesRef.current?.scrollIntoView({behavior: 'auto'})
    }, [])

    return (
        <Box>
            {messages.map(it =>
                <MessageItem itemMessage={it} key={it.id} />
            )}
            <div ref={endMessagesRef}></div>
        </Box>
    )
}