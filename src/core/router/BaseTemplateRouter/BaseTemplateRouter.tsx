import { ReactNode, Suspense } from "react";
import { useBreadcrumbs } from "../../Providers/BreadcrumbsProvider/BreadcrumbsProvider";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { RouteObjectExtend } from "../createBrowserRouter";

interface BaseTemplateRouterProps {
    children: ReactNode,
    title?: string,
    depth: number,
    link?: string,
    loaderType?: RouteObjectExtend['loaderType']
}
export default function BaseTemplateRouter({ children, title, depth, link, loaderType }: BaseTemplateRouterProps) {
    const _loaderType = loaderType || "backdrop";

    useBreadcrumbs({ label: title, link, depth });

    return (
        <Suspense fallback={
            _loaderType == "backdrop" && <Backdrop open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
            ||
            _loaderType == "simple" && <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        }>
            {children}
        </Suspense>
    )
}