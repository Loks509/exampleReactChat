import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function ButtonIconReject(props: IconButtonProps) {
    return (
        <Tooltip title="Отклонить">
            <IconButton {...props} aria-label="edit">
                <FontAwesomeIcon icon={faXmark} />
            </IconButton>
        </Tooltip>
    )
}