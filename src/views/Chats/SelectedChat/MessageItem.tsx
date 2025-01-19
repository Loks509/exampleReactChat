// @ts-nocheck
import { Grid2, Paper, PaperProps, Stack, Typography, useTheme } from "@mui/material";
import { IitemMessage } from "../../../store/messages/type";
import { useAppDispatch, useAppSelector } from "../../../store/useRedux";
import getFormatDateAndTimeFromPostgres from "../../../features/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { watchMessage } from "../../../store/messages/asyncReducer";
import { useEffect, useRef } from "react";

interface MessageItemProps {
    itemMessage: IitemMessage,
    onContextMenu?: PaperProps['onContextMenu'],
}
export default function MessageItem(props: MessageItemProps) {
    const isPending = useRef(false);

    const userId = useAppSelector(state => state.user.id);
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const isMyMessage = props.itemMessage.user_id == userId;
    const isReaded = props.itemMessage.viewed_at === null;

    useEffect(() => {
        if (props.itemMessage.viewed_at === null && !isPending.current) {
            dispatch(watchMessage(props.itemMessage.id));
            isPending.current = true;
        }
    }, [props.itemMessage.viewed_at, isPending.current])

    return (
        <Grid2 container sx={{ justifyContent: isMyMessage ? 'end' : '', alignItems: 'flex-end', my: 2 }}>
            {isReaded && isMyMessage && <FontAwesomeIcon icon={faCircle} color={theme.palette.chat.pointNotRead} size='xs' />}
            <Paper
                onContextMenu={props.onContextMenu}
                sx={{
                    backgroundColor: isMyMessage ? 'chat.selfMessageBackground' : 'chat.someoneMessageBackground',
                    padding: 1,
                    mx: 1,
                    maxWidth: '50%',
                    color: isMyMessage ? 'chat.selfMessageTextColor' : 'chat.someoneMessageTextColor',
                }}
            >
                <Stack direction="row">
                    <Typography>
                        {props.itemMessage.message}
                    </Typography>
                </Stack>
                <Typography sx={{ textAlign: 'right', display: 'block' }} variant="caption">
                    {getFormatDateAndTimeFromPostgres(props.itemMessage.created_at)}
                </Typography>
            </Paper>
            {isReaded && !isMyMessage && <FontAwesomeIcon icon={faCircle} color={theme.palette.chat.pointNotRead} size='xs' />}
        </Grid2>

    )
}