import { Breadcrumbs as BreadcrumbsMUI, Link as LinkMUI } from "@mui/material";
import { useBreadcrumbsGet } from "../BreadcrumbsProvider";
import { Link } from "react-router-dom";

interface BreadcrumbsProps {
    disableLast?: boolean
}

export default function Breadcrumbs(props: BreadcrumbsProps) {
    const breadcrumsAll = useBreadcrumbsGet();

    return (
        <BreadcrumbsMUI aria-label="breadcrumb">
            {breadcrumsAll.map((item, index) => {
                const isLast = index === breadcrumsAll.length - 1 && props.disableLast;

                if (item.link && !isLast) {
                    return (
                        <LinkMUI to={item.link} key={index} underline="hover" color="text.primary" component={Link}>
                            {item.label}
                        </LinkMUI>
                    )
                } else {
                    return <span key={index}>{item.label}</span>
                }

            })}

        </BreadcrumbsMUI>
    )
}