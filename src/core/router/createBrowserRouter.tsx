import { IndexRouteObject, NonIndexRouteObject, RouteObject, createBrowserRouter as createBrowserRouterReact } from "react-router-dom"
import BaseTemplateRouter from "./BaseTemplateRouter/BaseTemplateRouter"

interface GeneralRouteExtend {
    /**
     * Название страницы, идет в titileProvider и сохраняется в хлебные крошки
     */
    title?: string,
    /**
     * Нужно ли удалить ссылку из хлебной крошки.
     * Актуально для страниц без контента
     */
    deleteLink?: boolean,
    /**
     * Вид загрузчика: с задним затемнением, простой спиннер по середине
     */
    loaderType?: 'backdrop' | 'simple'
}

interface NonIndexRouteObjectExtend extends NonIndexRouteObject, GeneralRouteExtend {
    children?: RouteObjectExtend[]
}

interface IndexRouteObjectExtend extends IndexRouteObject, GeneralRouteExtend { }

export type RouteObjectExtend = NonIndexRouteObjectExtend | IndexRouteObjectExtend;

function getItemRouter(args: RouteObjectExtend, depth: number, upPath?: string): RouteObject {
    const path = args.path;
    let absolutePath: string | undefined;
    let relativePath = upPath || "";


    if (path) {
        if (path.substring(0, 1) == '/') {
            //absolute path
            absolutePath = path;
        } else {
            //relative path
            if (relativePath.slice(-1) !== '/') {
                relativePath += '/';
            }
            relativePath += `${path}`;
        }
    }


    if (args.children) {
        return {
            ...args,
            children: args.children ? args.children?.map(it => getItemRouter(it, depth + 1, relativePath)) : undefined,
            element: args.element ?
                <BaseTemplateRouter
                    children={args.element}
                    title={args.title}
                    depth={depth}
                    link={args.deleteLink ? undefined : (absolutePath || relativePath)}
                    loaderType={args.loaderType}
                /> : null
        }
    } else {
        return {
            ...args,
            element: args.element ?
                <BaseTemplateRouter
                    children={args.element}
                    title={args.title}
                    depth={depth}
                    link={args.deleteLink ? undefined : (absolutePath || relativePath)}
                    loaderType={args.loaderType}
                /> : null
        }
    }


}

export default function createBrowserRouter(routes: RouteObjectExtend[]) {

    const standartRoutes: RouteObject[] = routes.map(it => {
        return getItemRouter(it, 1, it.path);
    });

    return createBrowserRouterReact(standartRoutes);
}