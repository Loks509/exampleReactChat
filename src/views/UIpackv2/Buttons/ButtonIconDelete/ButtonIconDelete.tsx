import { IconButton, IconButtonProps, Tooltip, TooltipProps } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export type ButtonIconDeleteProps = IconButtonProps & {
    tooltipProps?: {
        title: TooltipProps['title']
    }
}

export default function ButtonIconDelete({tooltipProps, ...props}: ButtonIconDeleteProps) {
    return (
        <Tooltip title={tooltipProps?.title || "Удалить"}>
            <IconButton {...props} aria-label="delete">
                <FontAwesomeIcon icon={faTrash} />
            </IconButton>
        </Tooltip>
    )
}