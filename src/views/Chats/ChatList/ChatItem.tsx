// @ts-nocheck
import { ListItem, ListItemButton, ListItemProps, ListItemText, Stack, Typography, useTheme } from "@mui/material"
import { IitemChat } from "../../../store/chats/type"
import getFormatDateAndTimeFromPostgres from "../../../features/functions"
import { useAppSelector } from "../../../store/useRedux"
import { useEffect, useMemo } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { useSocketInstance } from "../../../core/Providers/SocketProvider/SocketProvider"

interface ChatItemProps {
    itemChat: IitemChat,
    onClick?: ListItemProps['onClick']
}

export default function ChatItem(props: ChatItemProps) {
    const userId = useAppSelector(state => state.user.id);
    const theme = useTheme();
    const socketInstance = useSocketInstance();

    const nameChat = useMemo(() =>
        userId == props.itemChat.user1.id ? props.itemChat.user2.name : props.itemChat.user1.name,
        [props.itemChat.id, userId]
    );

    useEffect(() => {

        const onNewChat = (data: { chat: IitemChat }) => {
            console.debug('new chats', data);
        }

        if (socketInstance != null) {
            socketInstance.channel(`update-chats-${props.itemChat.id}`)
                .listen('.update-chats', onNewChat);
        }

        return () => {
            if (socketInstance != null) {
                socketInstance.channel(`update-chats-${props.itemChat.id}`)
                .stopListening('.update-chats', onNewChat);
            }
        }
    }, [socketInstance])


    return (
        <ListItem divider>
            <ListItemButton component={Link} to={`/chat/${props.itemChat.id}`}>
                <ListItemText>
                    <Typography>
                        {nameChat}
                    </Typography>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant='subtitle2' display='block'>
                            {props.itemChat.latest_message.message}
                        </Typography>
                        {props.itemChat.latest_message.viewed_at === null && <FontAwesomeIcon icon={faCircle} color={theme.palette.chat.pointNotRead} size='xs' />}
                    </Stack>
                    <Typography variant='caption' align='right' display='block'>
                        {getFormatDateAndTimeFromPostgres(props.itemChat.latest_message.created_at)}
                    </Typography>
                </ListItemText>
            </ListItemButton>
        </ListItem >
    )
}