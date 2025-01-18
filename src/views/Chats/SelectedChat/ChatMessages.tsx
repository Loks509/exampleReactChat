import { Box } from "@mui/material";
import { useAppSelector } from "../../../store/useRedux";
import { messagesSelectors } from "../../../store/messages/selectors";
import MessageItem from "./MessageItem";

export default function ChatMessages() {
    const messages = useAppSelector(messagesSelectors.selectAll);

    return (
        <Box>
            {messages.map(it =>
                <MessageItem itemMessage={it} key={it.id} />
            )}
        </Box>
    )
}