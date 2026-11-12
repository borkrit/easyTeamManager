export interface RouteConfig {
    label: string;
    title: string;
    icon: string;
}
export interface NavItem {
    href: string;
    label: string;
    icon: string;
}

export const NAVIGATION_ROUTES: Record<string, RouteConfig> = {
    '/dashboard': {
        label: 'Pulpit',
        title: 'Panel Główny',
        icon: '📊',
    },
    '/projects': {
        label: 'Projekty',
        title: 'Projekty',
        icon: '📁',
    },
    '/tasks': {
        label: 'Zadania',
        title: 'Zarządzanie Zadaniami',
        icon: '📋',
    },
    '/team': {
        label: 'Zespół',
        title: 'Zarządzanie Zespołem',
        icon: '👥',
    },
    '/profile': {
        label: 'Profil',
        title: 'Profil użytkownika',
        icon: '👤',
    },
};

export const PAGE_TITLES: Record<string, string> = Object.fromEntries(
    Object.entries(NAVIGATION_ROUTES).map(([path, config]) => [path, config.title])
);


export const navItems:NavItem[] = Object.entries(NAVIGATION_ROUTES)
    .filter(([path]) => path !== '/profile') 
    .map(([href, config]) => ({
        href,
        label: config.label,
        icon: config.icon,
    }));


export const getPageTitleByUrl = (url: string, defaultTitle: string = 'Panel Zarządzania'): string => {
    if (PAGE_TITLES[url]) return PAGE_TITLES[url];

    const matchedKey = Object.keys(PAGE_TITLES).find(
        (path) => path !== '/' && url.startsWith(path)
    );

    return matchedKey ? PAGE_TITLES[matchedKey] : defaultTitle;
};