import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

export default function ButtonIconActions(props: IconButtonProps) {
    return (
        <Tooltip title="Действия">
            <IconButton {...props} aria-label="edit">
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </IconButton>
        </Tooltip>
    )
}