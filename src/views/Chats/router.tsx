import { lazy } from "react";

import { RouteObjectExtend } from "../../core/router/createBrowserRouter";
const ChatList = lazy(() => import("./ChatList/ChatList"));
const SelectedChat = lazy(() => import("./SelectedChat/SelectedChat"));

export const router: RouteObjectExtend[] = [
    {
        title: "Все чаты",
        path: "all",
        element: <ChatList />,
    },
    {
        title: "Some chat",
        path: ":chatId",
        element: <SelectedChat />
    }
];