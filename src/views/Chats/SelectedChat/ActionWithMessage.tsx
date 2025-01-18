import { Menu, MenuItem } from "@mui/material";
import { IitemMessage } from "../../../store/messages/type";
import { useAppDispatch } from "../../../store/useRedux";
import { setEditingMessage } from "../../../store/messages/slice";
import { deleteMessage } from "../../../store/messages/asyncReducer";

interface ActionWithMessageProps {
    handleClose: () => void,
    contextMenu: { mouseY: number, mouseX: number } | null,
    targetMessage: IitemMessage | null
}

export default function ActionWithMessage(props: ActionWithMessageProps) {
    const dispatch = useAppDispatch();

    const onDelete = () => {
        if (props.targetMessage) {
            dispatch(deleteMessage(props.targetMessage.id));
        }
        props.handleClose();
    }

    const onEdit = () => {
        if (props.targetMessage) {
            dispatch(setEditingMessage({
                id: props.targetMessage.id,
                message: props.targetMessage.message
            }))
        }
        props.handleClose();
    }

    return (
        <Menu
            open={props.contextMenu !== null}
            onClose={props.handleClose}
            anchorReference='anchorPosition'
            anchorPosition={
                props.contextMenu !== null
                    ? { top: props.contextMenu.mouseY, left: props.contextMenu.mouseX }
                    : undefined
            }
        >
            <MenuItem onClick={onEdit}>Редактировать</MenuItem>
            <MenuItem onClick={onDelete}>Удалить</MenuItem>
        </Menu>
    )
}