import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid2, IconButton, Paper } from "@mui/material";
import { Link } from "react-router-dom";

interface ChatHeaderProps {
    nameChat: string,
}

export default function ChatHeader(props: ChatHeaderProps) {
    return (
        <Paper sx={{
            position: 'fixed',
            left: 0,
            height: '55px',
            width: '100%',
            padding: 1,
        }}>
            <Container>
                <Grid2 container spacing={2} sx={{ height: '100%', alignItems: 'center' }}>
                    <Grid2 sx={{
                        cursor: 'pointer'
                    }}>
                        <IconButton component={Link} to='/chat/all'>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </IconButton>

                    </Grid2>
                    <Grid2>
                        {props.nameChat}
                    </Grid2>
                </Grid2>
            </Container>
        </Paper>
    )
}