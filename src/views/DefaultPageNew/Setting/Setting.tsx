//@ts-nocheck временно, надо убирать ошибки

import React, { useContext, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import { Typography, Menu, MenuItem, Box, ListItem, ListItemButton, Drawer, Popover } from "@mui/material";

import { ColorModeContext } from "../../../core/Providers/ThemeProviderMUI/ThemeProviderMUI";
import { logout } from "../../../core/Api/ApiAuth/methodsAuth";
import toast from "react-hot-toast";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { useSelector } from "react-redux";

const theme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
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


function ItemMenuClick(setting) {
    const themeMobile = useTheme();
    const isMobile = useMediaQuery(themeMobile.breakpoints.down('md'));
    return (
        <>
            {
                isMobile ? (
                    <ListItem key={setting.name} onClick={setting.action}
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
                        <ListItemButton>
                            <Typography textAlign="center">{setting.name}</Typography>
                        </ListItemButton>
                    </ListItem>
                ) : (
                    <MenuItem key={setting.name} onClick={setting.action} >
                        <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                )
            }

        </>
    )
}

function ItemMenuGeneral({ handleCloseUserMenu, ...setting }) {
    return (
        <>
            {setting.action && <ItemMenuClick {...setting} />}
        </>
    )
}

function Setting() {

    const [anchorElUser, setAnchorElUser] = useState(null);
    const colorMode = useContext(ColorModeContext);

    const { isLogin } = useSelector((state) => state.user);

    const open = Boolean(anchorElUser);
    const id = open ? "simple-popover" : undefined;
    const handleOpenPop = (e) => {
        setAnchorElUser(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorElUser(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logOutF = () => {
        logout().then(resp => {
            toast.success("Успешный выход!");
        })
        handleCloseUserMenu();
    }

    const settings = [
        { name: <colorMode.Toggler />, action: colorMode.toggleColorMode },
        { name: 'Выход', action: logOutF },
    ];
    const settings2 = [
        { name: <colorMode.Toggler />, action: colorMode.toggleColorMode },
    ];

    const themeMobile = useTheme();
    const isMobile = useMediaQuery(themeMobile.breakpoints.down('md'));

    const [openDrawer, setOpenDrawer] = React.useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpenDrawer(newOpen);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '160px',
                width: '33%'
            }}>
            {isLogin &&
                <Box onClick={handleOpenPop}
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
                    <FontAwesomeIcon icon={faGear} size="lg" />
                </Box >
            }
            {isMobile ? (
                <ThemeProvider theme={theme} >

                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorElUser}
                            onClose={handleClose}

                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            sx={{
                                mt: '-1.125rem'
                            }}
                        >
                            {settings.map((setting, index) => (
                                <ItemMenuGeneral {...setting} key={index} handleCloseUserMenu={handleCloseUserMenu} />
                            ))}
                        </Popover>
                    </Drawer>
                </ThemeProvider>
            ) : (
                <Menu
                    sx={{
                        mt: '2.8125rem',
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting, index) => (
                        <ItemMenuGeneral {...setting} key={index} />
                    ))}
                </Menu>
            )}

            {!isLogin &&
                <Box
                    sx={{
                        cursor: 'pointer',
                        color: {
                            xs: "icon.main",
                            sm: "icon.main",
                            md: "white",
                            lg: "white",
                            xl: "white",
                        },
                        padding: '0'
                    }}>
                    {settings2.map((setting, index) => (
                        <ItemMenuGeneral {...setting} key={index} />
                    ))}
                </Box>
            }
        </Box >
    )
}
export default Setting