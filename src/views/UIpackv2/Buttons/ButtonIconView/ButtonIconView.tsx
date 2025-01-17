import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from '@fortawesome/free-solid-svg-icons'

export default function ButtonIconView(props: IconButtonProps) {
    return (
        <Tooltip title="Просмотр">
            <IconButton {...props} aria-label="delete">
                <FontAwesomeIcon icon={faEye} />
            </IconButton>
        </Tooltip>
    )
}