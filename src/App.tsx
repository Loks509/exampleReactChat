//@ts-nocheck временно, надо убирать ошибки

import React, { useEffect } from 'react';
import './App.css'

import { RouterProvider } from "react-router-dom"
import { processAccessToken } from './features/functions';

import { Toaster } from 'react-hot-toast';

import ThemeProviderMUI from './core/Providers/ThemeProviderMUI/ThemeProviderMUI';
import { setUserData, setUserId } from './store/user/userSlice';
import BreadcrumbsProvider from './core/Providers/BreadcrumbsProvider/BreadcrumbsProvider';
import { CssBaseline } from '@mui/material';
import { hideModal } from './store/modalAuth/slice';
import { getCurrentAccessToken } from './core/Api/functionsStorage';
import router from './router';
import { useAppDispatch } from './store/useRedux';
import { getCurrentUser } from './store/user/asyncReducer';
import SocketProvider from './core/Providers/SocketProvider/SocketProvider';

window.Pusher = import('pusher-js');

function App() {
    const accessToken = getCurrentAccessToken();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (accessToken) {
            dispatch(getCurrentUser());
        }
    }, [accessToken])


    return (
        <BreadcrumbsProvider>
            <ThemeProviderMUI>
                <SocketProvider>
                    <CssBaseline enableColorScheme />
                    <RouterProvider router={router} />
                    <Toaster position="bottom-center" />
                </SocketProvider>
            </ThemeProviderMUI>
        </BreadcrumbsProvider>
    )
}

export default App
