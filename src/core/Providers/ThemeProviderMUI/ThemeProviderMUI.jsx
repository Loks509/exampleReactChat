import React, { createContext, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const keyColorMode = "colorMode";

export default function ThemeProviderMUI({ children }) {
    const [mode, setMode] = React.useState(localStorage.getItem(keyColorMode) || 'light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const mode = prevMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem(keyColorMode, mode);
                    return mode;
                });
            },
        }),
        [],
    );

    const Toggler = useMemo(() => {
        return (
            function () {
                return (<>
                    {mode === 'light' && <>
                        <Box sx={{ display: 'inline' }}>
                            <FontAwesomeIcon icon={faMoon} size="lg" />
                        </Box>
                    </>}
                    {mode === 'dark' && <>
                        <Box sx={{ display: 'inline' }}>
                            <FontAwesomeIcon icon={faSun} size="lg" />
                        </Box>
                    </>}
                </>
                )
            }
        )
    }, [mode]);

    const theme = React.useMemo(
        () =>
            createTheme(
                mode === 'light' ? lightTheme : darkTheme
            ),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={{ ...colorMode, Toggler: Toggler }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}