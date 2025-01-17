import { Button, ButtonProps } from "@mui/material";

export default function ButtonSave({ children, ...props }: ButtonProps) {
    return (
        <Button variant="outlined" color='success' {...props} >
            {children}
        </Button>
    )
}