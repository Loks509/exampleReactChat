import { IconButton, IconButtonProps, Tooltip, TooltipProps } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from '@fortawesome/free-solid-svg-icons'

type ButtonIconSignProps = {
    iconButtonSlot: IconButtonProps,
    tooltipSlot: {
        title?: TooltipProps['title'],
        onOpen?: TooltipProps['onOpen'],
        enterDelay?: TooltipProps['enterDelay']
    },
}

export default function ButtonIconSign(props: ButtonIconSignProps) {
    return (
        <Tooltip title="Подписать" {...props.tooltipSlot}>
            <IconButton {...props.iconButtonSlot} aria-label="sign">
                <FontAwesomeIcon icon={faFileSignature} />
            </IconButton>
        </Tooltip>
    )
}