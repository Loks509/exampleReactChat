import { Button, ButtonProps } from "@mui/material";

export default function ButtonBack({children, ...props}: ButtonProps){
    return (
        <Button variant="outlined" {...props}>
            {children}
        </Button>
    )
}