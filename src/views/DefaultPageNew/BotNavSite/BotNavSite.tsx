//@ts-nocheck временно, надо убирать ошибки

import React, { useState } from "react";

import { Box, Typography, Popover, ListItem, ListItemButton, Drawer } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";

const arrayForButton = [
    { key: 'chat', label: 'Чат', link: '/chat/all' },
]

const theme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                },
            },
        },
    },
    palette: {
        menu: {
            main: '#e1e7ef',
            light: '#E7EBF2',
            dark: '#e8eaef',
            contrastText: '#272945',
        },
    },
});

function BotNavSite() {

    const [containerEl, setContainerEl] = useState(null);

    const handleOpen = (e) => {
        setContainerEl(e.currentTarget);
    };

    const handleClose = () => {
        setContainerEl(null);
    };

    const open = Boolean(containerEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '160px',
            width: '33%'
        }}>
            <Box aria-describedby={id} variant="contained" onClick={handleOpen}
                sx={{
                    cursor: 'pointer',
                    color: {
                        xs: "icon.main",
                        sm: "icon.main",
                        md: "white",
                        lg: "white",
                        xl: "white",
                    }
                }}>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="lg" />
            </Box >
            <ThemeProvider theme={theme}>
                <Drawer open={open} anchor={"bottom"}>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={containerEl}
                        onClose={handleClose}

                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        sx={{
                            mt: '-1.125rem'
                        }}
                    >
                        {arrayForButton.map((text) => (
                            <Typography key={text.key} variant="body1" color={"#272945"} display={"contents"} >
                                <ListItem
                                    sx={{
                                        width: "auto",
                                        backgroundColor: "menu.main",
                                        borderRadius: "0.9375rem",
                                        height: "2.5rem",
                                        marginBottom: "0.3125rem",
                                        padding: {
                                            xs: "0.5rem 0",
                                            sm: "0.5rem 0",
                                            md: "0.5rem 0.625rem",
                                            lg: "0.5rem 0.625rem"
                                        }
                                    }}>
                                    <ListItemButton to={text.link} sx={{ borderRadius: '2' }} LinkComponent={Link} onClick={handleClose}>
                                        {text.label}
                                    </ListItemButton>
                                </ListItem>
                            </Typography>
                        ))}
                    </Popover>
                </Drawer>
            </ThemeProvider>
        </Box>
    )
}
export default BotNavSite