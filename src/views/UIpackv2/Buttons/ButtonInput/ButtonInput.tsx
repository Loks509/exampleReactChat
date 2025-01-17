//@ts-nocheck временно, надо убирать ошибки

import { Button, ButtonProps } from "@mui/material";

export default function ButtonInput({ children, ...props }: ButtonProps) {
    return (
        <Button variant="contained" color="buttonInput"  {...props} >
            {children}
        </Button>
    )
}