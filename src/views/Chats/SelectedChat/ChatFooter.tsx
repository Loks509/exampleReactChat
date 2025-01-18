import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Container, Grid2, IconButton, Paper, TextField, Tooltip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/useRedux";
import { sendMessage } from "../../../store/messages/asyncReducer";
import { setEditingMessage } from "../../../store/messages/slice";

interface ChatFooterProps {
    chatId: number,
}

export default function ChatFooter(props: ChatFooterProps) {
    const dispatch = useAppDispatch();
    
    const message = useAppSelector(state => state.messages.editingMessage);
    const isSending = useAppSelector(state => state.messages.loadingStatusEditing) === 'loading';
    const isError = useAppSelector(state => state.messages.loadingStatusEditing) === 'failed';

    const sendMsg = () => {
        dispatch(sendMessage({
            chat_id: props.chatId,
            ...message,
        }))
    }

    const onKeyDownTextField = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            sendMsg();
        }
    }

    return (
        <Paper sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            height: '80px',
            width: '100%',
        }}>
            <Container>
                {message.id && <Typography variant='subtitle2'>Редактирование сообщения</Typography>}
                <Grid2 container spacing={2} sx={{ height: '100%', alignItems: 'center' }}>
                    <Grid2 size={10}>
                        <TextField
                            onKeyDown={onKeyDownTextField}
                            fullWidth
                            value={message.message}
                            onChange={(event) => dispatch(setEditingMessage({ ...message, message: event.target.value }))}
                        />
                    </Grid2>
                    <Grid2 size={1}>
                        {isSending &&
                            <CircularProgress />
                        }
                        {!isSending &&
                            <IconButton onClick={sendMsg}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </IconButton>
                        }
                    </Grid2>
                    <Grid2 size={1}>
                        {isError &&
                            <Tooltip title="Произошла ошибка во время отправки">
                                <FontAwesomeIcon icon={faXmark} color="red" size="2x" />
                            </Tooltip>
                        }
                    </Grid2>
                </Grid2>
            </Container>

        </Paper>
    )
}