//@ts-nocheck временно, надо убирать ошибки
import React from "react";
import { Typography, Breadcrumbs } from "@mui/material";

import { useBreadcrumbsGet } from "../../../core/Providers/BreadcrumbsProvider/BreadcrumbsProvider";

function HeaderBreadcrumbs() {
    const breadcrumbs = useBreadcrumbsGet();
    return (
        <Breadcrumbs maxItems={4} aria-label="breadcrumb" separator="›" color="white">
            {breadcrumbs.map((item, index) => {

                const last = index === breadcrumbs.length - 1;

                return last ? (
                    <Typography key={index} variant="body1" color={"#fff"} display={"contents"} >
                        {item.label}
                    </Typography>
                ) : (
                    <Typography variant="body1" color={"#fff"} display={"contents"} key={index}>
                        {item.label}
                    </Typography>
                );
            })}
        </Breadcrumbs>
    )
}
export default HeaderBreadcrumbs