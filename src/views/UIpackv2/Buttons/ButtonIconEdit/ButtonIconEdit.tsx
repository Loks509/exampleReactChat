import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from '@fortawesome/free-solid-svg-icons'

export default function ButtonIconEdit(props: IconButtonProps) {
    return (
        <Tooltip title="Редактировать">
            <IconButton {...props} aria-label="edit">
                <FontAwesomeIcon icon={faPencil} />
            </IconButton>
        </Tooltip>
    )
}