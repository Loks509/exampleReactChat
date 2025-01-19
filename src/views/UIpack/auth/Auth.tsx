//@ts-nocheck временно, надо убирать ошибки

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Box, Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import DialogAuth from "../../UIpackv2/Auth/DialogAuth";
import { hideModal, showModal } from "../../../store/modalAuth/slice";



function Auth() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [dataLogin, setDataLogin] = useState({});

    const handleOnChangeLoginForm = (event) => {
        dataLogin[event.target.name] = event.target.value;
        setDataLogin(dataLogin)
    }

    const dispatch = useDispatch();

    const isShow = useSelector(state => state.modalAuth.isShow);

    const handleCloseDialog = () => {
        dispatch(hideModal())
    }

    const handleOpenDialog = () => {
        dispatch(showModal())
    }

    const handleOpenUserMenu = (event) => {
        if (isLogin) {
            setAnchorElUser(event.currentTarget);
        } else {
            handleOpenDialog();
        }
    };

    const isLogin = useSelector((state) => state.user.isLogin);

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '160px',
            width: '33%'
        }}>
            {isLogin &&
                <Tooltip title="Личный кабинет">
                    <Box
                        sx={{
                            marginRight: {
                                md: "1.25rem",
                                lg: "1.25rem",
                                xl: "1.25rem",
                            },
                            color: {
                                xs: "icon.main",
                                sm: "icon.main",
                                md: "white",
                                lg: "white",
                                xl: "white",
                            }
                        }}>
                        <FontAwesomeIcon icon={faUser} size="lg" />
                    </Box>
                </Tooltip>
            }
            {!isLogin &&
                <>
                    <Tooltip title="Личный кабинет">
                        <Box onClick={handleOpenUserMenu}
                            sx={{
                                cursor: 'pointer',
                                marginRight: {
                                    md: "1.25rem",
                                    lg: "1.25rem",
                                    xl: "1.25rem",
                                },
                                color: {
                                    xs: "icon.main",
                                    sm: "icon.main",
                                    md: "white",
                                    lg: "white",
                                    xl: "white",
                                }
                            }}>
                            <FontAwesomeIcon icon={faUser} size="lg" />
                        </Box>
                    </Tooltip>

                    <DialogAuth isOpen={isShow} handleClose={() => handleCloseDialog()} />
                </>
            }
        </Box>
    )
}

// export { ButtonAuth }
export default Auth