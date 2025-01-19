import createBrowserRouter from "./core/router/createBrowserRouter"
import { router as chatRouter } from "./views/Chats/router"
import * as views from "./views"
import { Link, Outlet } from "react-router-dom"
import { Button } from "@mui/material"

const router = createBrowserRouter([
    {
        title: "Главная",
        path: "/",
        element: <views.DefaultPageNew />,
        children: [
            {
                title: "Чат",
                path: "/chat",
                element: <Outlet />,
                children: chatRouter
            },
            {
                path: '',
                element: <Button variant='outlined' color='success' component={Link} to='/chat/all'>К чату!</Button>
            }
        ]

    },
])
export default router