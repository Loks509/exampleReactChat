import React, { ChangeEvent, useId, useState } from "react";
import { IconButton, FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface TextFieldPasswordProps {
    label: string,
    name: string,
    value?: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    helperText?: string,
    error?: boolean
}

function TextFieldPassword({ label, name, value, onChange, helperText, error, ...props }: TextFieldPasswordProps) {
    const idInput = useId();
    const idHelperText = useId();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    return (
        <FormControl variant="outlined" error={error}>
            <InputLabel htmlFor={idInput} >
                {label}
            </InputLabel>
            <OutlinedInput
                id={idInput}
                type={showPassword ? 'text' : 'password'}
                name={name}
                value={value}
                onChange={onChange}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
                aria-describedby={idHelperText}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="small"
                        >
                            {showPassword ? (
                                <FontAwesomeIcon icon={faEye} size="sm" />
                            ) : (
                                <FontAwesomeIcon icon={faEyeSlash} size="sm" />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                {...props}
            />
            <FormHelperText id={idHelperText}>{helperText}</FormHelperText>
        </FormControl>
    );
}
export default TextFieldPassword