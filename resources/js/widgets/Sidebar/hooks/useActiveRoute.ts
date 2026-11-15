import { usePage } from '@inertiajs/react';

export const useActiveRoute = () => {
    const page = usePage<any>();
    const url = page.url ?? page.props?.url;
    const currentUrl = url || '/dashboard';

    const isRouteActive = (href: string) => {
        return href === '/dashboard' ? currentUrl === '/dashboard' : currentUrl.startsWith(href);
    };

    return { currentUrl, isRouteActive };
};