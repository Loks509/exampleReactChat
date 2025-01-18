import { faMailReplyAll, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid2, IconButton, Paper, TextField } from "@mui/material";
import { useRef, useState } from "react";

interface ChatFooterProps {
    chatId: number,
}

export default function ChatFooter(props: ChatFooterProps) {
    const [message, setMessage] = useState('');
    const ref = useRef<HTMLInputElement>();

    const sendMessage = () => {
        //TODO
    }

    const onKeyDownTextField = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    return (
        <Paper sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            height: '70px',
            width: '100%',
        }}>
            <Container>
                <Grid2 container spacing={2} sx={{ height: '100%', alignItems: 'center' }}>
                    <Grid2 size={10}>
                        <TextField
                            onKeyDown={onKeyDownTextField}
                            inputRef={ref}
                            fullWidth
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </Grid2>
                    <Grid2 size={2}>
                        <IconButton>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </IconButton>
                    </Grid2>
                </Grid2>
            </Container>

        </Paper>
    )
}