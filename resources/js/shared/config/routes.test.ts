import { describe, it, expect } from 'vitest';
import { getPageTitleByUrl, NAVIGATION_ROUTES } from './routes';

describe('getPageTitleByUrl helper with NAVIGATION_ROUTES', () => {
    it('returns correct title for exact route matches from NAVIGATION_ROUTES', () => {
        Object.entries(NAVIGATION_ROUTES).forEach(([path, config]) => {
            expect(getPageTitleByUrl(path)).toBe(config.title);
        });
    });

    it('returns correct title for nested routes starting with a known path', () => {
        expect(getPageTitleByUrl('/tasks/123/edit')).toBe(NAVIGATION_ROUTES['/tasks'].title);
        expect(getPageTitleByUrl('/projects/new-project')).toBe(NAVIGATION_ROUTES['/projects'].title);
        expect(getPageTitleByUrl('/team/members/42')).toBe(NAVIGATION_ROUTES['/team'].title);
    });

    it('returns default fallback title for unknown routes', () => {
        expect(getPageTitleByUrl('/unknown-page')).toBe('Panel Zarządzania');
    });

    it('allows providing a custom default fallback title', () => {
        expect(getPageTitleByUrl('/custom-route', 'Strona Nie Znaleziona')).toBe('Strona Nie Znaleziona');
    });
});