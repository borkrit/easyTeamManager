export const PAGE_TITLES: Record<string, string> = {
    '/dashboard': 'Panel Główny',
    '/tasks': 'Zarządzanie Zadaniami',
    '/team': 'Zarządzanie Zespołem',
    '/projects': 'Projekty',
    '/profile': 'Profil użytkownika',
};

/**
 * Хелпер для получения заголовка страницы по текущему URL с поддержкой вложенных путей
 */
export const getPageTitleByUrl = (url: string, defaultTitle: string = 'Panel Zarządzania'): string => {
    if (PAGE_TITLES[url]) return PAGE_TITLES[url];

    const matchedKey = Object.keys(PAGE_TITLES).find(
        (path) => path !== '/' && url.startsWith(path)
    );

    return matchedKey ? PAGE_TITLES[matchedKey] : defaultTitle;
};