import { IconButton, IconButtonProps, Tooltip, TooltipProps } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from '@fortawesome/free-solid-svg-icons'

export type ButtonIconPrintProps = IconButtonProps & {
    tooltipProps?: {
        title: TooltipProps['title']
    }
}

export default function ButtonIconPrint({tooltipProps, ...props}: ButtonIconPrintProps) {
    return (
        <Tooltip title={tooltipProps?.title || "Печать"}>
            <IconButton {...props} aria-label="print">
                <FontAwesomeIcon icon={faPrint} />
            </IconButton>
        </Tooltip>
    )
}