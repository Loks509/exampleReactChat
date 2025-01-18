import { Grid2, Paper, Stack, Typography } from "@mui/material";
import { IitemMessage } from "../../../store/messages/type";
import { useAppSelector } from "../../../store/useRedux";
import getFormatDateAndTimeFromPostgres from "../../../features/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

interface MessageItemProps {
    itemMessage: IitemMessage
}
export default function MessageItem(props: MessageItemProps) {
    const userId = useAppSelector(state => state.user.id);

    //TODO
    const isMyMessage = props.itemMessage.user_id == userId;
    const isReaded = props.itemMessage.viewed_at === null

    return (
        <Grid2 container sx={{ justifyContent: isMyMessage ? 'end' : '', alignItems: 'flex-end', my: 2 }}>
            {isReaded && isMyMessage && <FontAwesomeIcon icon={faCircle} color="#1976d2" size='xs' />}
            <Paper
                sx={{
                    backgroundColor: isMyMessage ? 'chat.selfMessageBackground' : 'chat.someoneMessageBackground',
                    padding: 1,
                    mx: 1,
                    maxWidth: '50%',
                    color: isMyMessage ? 'chat.selfMessageTextColor' : 'chat.someoneMessageTextColor',
                }}>
                <Stack direction="row">
                    <Typography>
                        {props.itemMessage.message}
                    </Typography>
                </Stack>
                <Typography sx={{ textAlign: 'right', display: 'block' }} variant="caption">
                    {getFormatDateAndTimeFromPostgres(props.itemMessage.created_at)}
                </Typography>
            </Paper>
            {isReaded && !isMyMessage && <FontAwesomeIcon icon={faCircle} color="#1976d2" size='xs' />}
        </Grid2>

    )
}