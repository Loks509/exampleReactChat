import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ButtonInput from "../Buttons/ButtonInput/ButtonInput";
import { login } from "../../../core/Api/ApiAuth/methodsAuth";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setUserId } from "../../../store/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TextFieldPassword from "../TextFields/TextFieldPassword/TextFieldPassword";

interface DialogAuthProps {
    isOpen: boolean,
    handleClose: () => void
}

export default function DialogAuth({ isOpen, handleClose }: DialogAuthProps) {
    const [mode, setMode] = useState<'login' | 'register'>('login');

    const [dataLogin, setDataLogin] = useState<{ login: string, password: string, email?: string, passwordRepeat?: string }>({
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
            login: '',
            password: '',
            email: '',
            passwordRepeat: '',
        });
    }, [mode, isOpen]);

    const dispatch = useDispatch();

    function logInF(event: FormEvent) {
        event.preventDefault();

        login(dataLogin.login, dataLogin.password)
            .then((resp) => {
                if (resp.data?.sub) {
                    /* @ts-ignore */
                    dispatch(setUserId(resp.data));
                    toast.success("Вы успешно авторизованы!");
                    handleClose();
                    return resp.data.sub;
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                if (error.status === 400)
                    toast.error("Неверный логин и/или пароль");
            })
    }

    function registerF(event: FormEvent) {
        event.preventDefault();

        if(dataLogin.password === dataLogin.passwordRepeat){
            console.debug("auth");
        }else{
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