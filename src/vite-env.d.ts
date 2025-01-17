/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL_STATIC: number,
    readonly VITE_BASE_URL: string,
    readonly VITE_EMPTY_REFRESH: string,
    readonly VITE_INVALID_SIGNATURE: string,
    readonly VITE_TIMEOUT_ACCESS: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}