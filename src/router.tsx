import createBrowserRouter from "./core/router/createBrowserRouter"
import { router as chatRouter } from "./views/Chats/router"
import * as views from "./views"
import { Outlet } from "react-router-dom"

const router = createBrowserRouter([
    //блок для отображения контента со всякой фигней вокруг
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
                path: '*',
                element: <>Not Found</>
            }
        ]

    },
])
export default router