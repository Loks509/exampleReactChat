/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL_STATIC: number,
    readonly VITE_BASE_URL: string,
    readonly VITE_SOCKET_PORT: number,
    readonly VITE_SOCKET_ADDR: string,
    readonly VITE_KEY_REVERB: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}