import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ButtonInput from "../Buttons/ButtonInput/ButtonInput";
import { signIn, signUp } from "../../../core/Api/ApiAuth/methodsAuth";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TextFieldPassword from "../TextFields/TextFieldPassword/TextFieldPassword";

interface DialogAuthProps {
    isOpen: boolean,
    handleClose: () => void
}

export default function DialogAuth({ isOpen, handleClose }: DialogAuthProps) {
    const [mode, setMode] = useState<'login' | 'register'>('login');

    const [dataLogin, setDataLogin] = useState<{ name: string, login: string, password: string, email: string, passwordRepeat: string }>({
        name: '',
        login: '',
        password: '',
        email: '',
        passwordRepeat: '',
    });


    const toLogin = () => {
        setMode('login')
    }
    const toRegister = () => {
        setMode('register');
    }


    useEffect(() => {
        setDataLogin({
            name: '',
            login: '',
            password: '',
            email: '',
            passwordRepeat: '',
        });
    }, [mode, isOpen]);

    function logInF(event: FormEvent) {
        event.preventDefault();

        signIn(dataLogin.login, dataLogin.password)
            .then(() => {
                toast.success("Вы успешно авторизованы!");
                handleClose();
            })
            .catch(() => {
                toast.error("Неверный логин и/или пароль");
            })
    }

    function registerF(event: FormEvent) {
        event.preventDefault();

        if (dataLogin.password === dataLogin.passwordRepeat) {
            signUp(dataLogin.email, dataLogin.password, dataLogin.name)
        } else {
            toast.error("Пароли не совпадают!");
        }
    }


    const changeData = (event: ChangeEvent<HTMLInputElement>) => {
        setDataLogin(
            {
                ...dataLogin,
                [event.target.name]: event.target.value
            }
        )
    }

    const isErrorRepeatPassword = mode === 'register' && dataLogin.password.length > 0 && dataLogin.passwordRepeat !== undefined && dataLogin.passwordRepeat.length > 0 && dataLogin.password !== dataLogin.passwordRepeat

    return (
        <Dialog onClose={handleClose} open={isOpen} >
            {mode === 'login' &&
                <form onSubmit={logInF}>
                    <Box
                        sx={{
                            width: {
                                xs: "auto",
                                sm: "auto",
                                md: '25rem',
                                lg: '25rem',
                                xl: '25rem',
                            }
                        }}
                    >
                        <Box >
                            <DialogTitle style={{ fontSize: '18px' }}>
                                Авторизация на сайте
                            </DialogTitle>
                            <IconButton aria-label="close"
                                onClick={handleClose}
                                sx={() => ({
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                })}>
                                <FontAwesomeIcon icon={faXmark} size="lg" />
                            </IconButton>
                        </Box>
                        <Divider />
                        <DialogContent>
                            <Stack direction="column" spacing={3} my={2}>
                                <TextField variant="outlined" label="Логин" name="login" value={dataLogin.login || ''} onChange={changeData} autoComplete="on" />
                                <TextFieldPassword value={dataLogin.password || ''} onChange={changeData} name={"password"} label={"Пароль"} />
                            </Stack>
                        </DialogContent>
                        <Divider />
                        <DialogActions sx={{
                            width: '100%',
                            display: 'block',
                            justifyContent: 'space-between'
                        }}>
                            <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                                <ButtonInput type="submit" fullWidth>
                                    Войти
                                </ButtonInput>
                            </Box>
                            <Box display={'flex'} justifyContent={'right'}>
                                <Typography variant='subtitle1' onClick={toRegister} sx={{ cursor: 'pointer' }}>Ещё не с нами? Зарегистрироваться</Typography>
                            </Box>
                        </DialogActions>
                    </Box>
                </form>
            }
            {mode === 'register' &&
                <form onSubmit={registerF}>
                    <Box
                        sx={{
                            width: {
                                xs: "auto",
                                sm: "auto",
                                md: '25rem',
                                lg: '25rem',
                                xl: '25rem',
                            }
                        }}
                    >
                        <Box >
                            <DialogTitle style={{ fontSize: '18px' }}>
                                Регистрация на сайте
                            </DialogTitle>
                            <IconButton aria-label="close"
                                onClick={handleClose}
                                sx={() => ({
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                })}>
                                <FontAwesomeIcon icon={faXmark} size="lg" />
                            </IconButton>
                        </Box>
                        <Divider />
                        <DialogContent>
                            <Stack direction="column" spacing={3} my={2}>
                                <TextField variant="outlined" label="ФИО" name="name" value={dataLogin.name} onChange={changeData} autoComplete="on" />
                                <TextField variant="outlined" label="Логин" name="login" value={dataLogin.login} onChange={changeData} autoComplete="on" />
                                <TextField variant="outlined" label="Электронная почта" name="email" value={dataLogin.email || ''} onChange={changeData} autoComplete="on" />
                                <TextFieldPassword value={dataLogin.password} onChange={changeData} name={"password"} label={"Пароль"} />
                                <TextFieldPassword error={isErrorRepeatPassword} helperText={isErrorRepeatPassword ? "Пароли не совпадают" : undefined} value={dataLogin.passwordRepeat} onChange={changeData} name={"passwordRepeat"} label={"Повторите пароль"} />
                            </Stack>
                        </DialogContent>
                        <Divider />
                        <DialogActions sx={{
                            width: '100%',
                            display: 'block',
                            justifyContent: 'space-between'
                        }}>
                            <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                                <ButtonInput type="submit" fullWidth>
                                    Зарегистрировться
                                </ButtonInput>
                            </Box>
                            <Box display={'flex'} justifyContent={'right'}>
                                <Typography variant='subtitle1' onClick={toLogin} sx={{ cursor: 'pointer' }}>Уже с нами? Авторизоваться</Typography>
                            </Box>
                        </DialogActions>
                    </Box>
                </form>
            }
        </Dialog >
    )
}