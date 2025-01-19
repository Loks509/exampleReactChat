import Echo from "laravel-echo";
import { createContext, ReactNode, useContext, useState } from "react";
import useEffectAuth from "../../hooks/useEffectAuth";

type EchoInstance = Echo<'reverb'>

const socketContext = createContext<
    { socket: EchoInstance | null }
>(
    { socket: null }
);

interface SocketProviderProps {
    children: ReactNode
}

function SocketProvider({ children }: SocketProviderProps) {
    const [socket, setSocket] = useState<EchoInstance | null>(null);

    useEffectAuth(() => {
        setSocket(new Echo({
            broadcaster: 'reverb',
            key: import.meta.env.VITE_KEY_REVERB,
            wsHost: import.meta.env.VITE_SOCKET_ADDR,
            wsPort: import.meta.env.VITE_SOCKET_PORT,
            forceTLS: false,
            enabledTransports: ['ws']
        }))

        return () => {
            setSocket(null)
        }
    }, [])

    return (
        <socketContext.Provider value={{ socket }}>
            {children}
        </socketContext.Provider>
    )
}


export function useSocketContext() {
    const socket = useContext(socketContext);
    if (!socket) throw new Error("hook useBreadcrumbs must call only in BreadcrumbsProvider");
    return socket;
}

export function useSocketInstance(){
    const socket = useContext(socketContext);
    if (!socket) throw new Error("hook useBreadcrumbs must call only in BreadcrumbsProvider");
    return socket.socket
}

export { socketContext }
export default SocketProvider