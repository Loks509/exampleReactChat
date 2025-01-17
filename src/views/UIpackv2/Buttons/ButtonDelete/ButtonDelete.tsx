import { Button, ButtonProps } from "@mui/material";

export default function ButtonDelete({children, ...props}: ButtonProps){
    return (
        <Button variant="outlined" color="error" {...props}>
            {children}
        </Button>
    )
}