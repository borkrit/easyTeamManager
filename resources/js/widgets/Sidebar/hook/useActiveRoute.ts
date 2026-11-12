import { usePage } from '@inertiajs/react';

export const useActiveRoute = () => {
    const { url } = usePage<any>().props;
    const currentUrl = url || '/dashboard';

    const isRouteActive = (href: string) => {
        return href === '/dashboard' ? currentUrl === '/dashboard' : currentUrl.startsWith(href);
    };

    return { currentUrl, isRouteActive };
};