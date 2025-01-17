import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface BreadcrumbsProviderProps {
    children: ReactNode
}

interface itemBreadcrumbs {
    label?: string,
    link?: string,
    depth: number,
}

interface breadcrumbsContextValues {
    breadcrumbs: itemBreadcrumbs[],
    addBreadcrumbs: (_: itemBreadcrumbs) => void,
    removeBreadcrumbs: (_: itemBreadcrumbs) => void,
}

const initialStateBreadcrumbs: breadcrumbsContextValues = {
    breadcrumbs: [],
    addBreadcrumbs(_) { },
    removeBreadcrumbs(_) { },
}

const BreadcrumbsContext = createContext<breadcrumbsContextValues>(initialStateBreadcrumbs);

export default function BreadcrumbsProvider({ children }: BreadcrumbsProviderProps) {
    const [breadcrumbs, setBreadcrumbs] = useState<itemBreadcrumbs[]>([]);

    const addBreadcrumbs = (item: itemBreadcrumbs) => {
        setBreadcrumbs((state) => state.concat(item).sort((a, b) => a.depth - b.depth))
    }

    const removeBreadcrumbs = (item: itemBreadcrumbs) => {
        setBreadcrumbs((state) => state.filter(it => it.label != item.label));
    }

    return (
        <BreadcrumbsContext.Provider value={{ breadcrumbs, addBreadcrumbs, removeBreadcrumbs }}>
            {children}
        </BreadcrumbsContext.Provider>
    )
}

export function useBreadcrumbsContext() {
    const breadcrumbsContext = useContext(BreadcrumbsContext);
    if (!breadcrumbsContext) throw new Error("hook useBreadcrumbs must call only in BreadcrumbsProvider");
    return breadcrumbsContext;
}

export function useBreadcrumbs(item: itemBreadcrumbs) {
    const breadcrumbsContext = useBreadcrumbsContext();

    useEffect(() => {
        if (item.label) {
            breadcrumbsContext.addBreadcrumbs(item);
        }
        return () => {
            breadcrumbsContext.removeBreadcrumbs(item);
        }
    }, [item.label]);
}

export function useBreadcrumbsGet(): itemBreadcrumbs[] {
    const breadcrumbsContext = useBreadcrumbsContext();

    console.debug(breadcrumbsContext.breadcrumbs)
    return breadcrumbsContext.breadcrumbs;
}