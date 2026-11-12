import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useActiveRoute } from '../hook/useActiveRoute';

let mockUrl = '/dashboard';

vi.mock('@inertiajs/react', () => ({
    usePage: () => ({
        url: mockUrl,
    }),
}));

describe('useActiveRoute hook', () => {
    it('returns correct current url', () => {
        const { result } = renderHook(() => useActiveRoute());
        expect(result.current.currentUrl).toBe('/dashboard');
    });

    it('correctly identifies active route for dashboard with exact match', () => {
        mockUrl = '/dashboard';
        const { result } = renderHook(() => useActiveRoute());
        
        expect(result.current.isRouteActive('/dashboard')).toBe(true);
        expect(result.current.isRouteActive('/tasks')).toBe(false);
    });

    it('correctly identifies active route with prefix matching for nested paths', () => {
        mockUrl = '/tasks/42/edit';
        const { result } = renderHook(() => useActiveRoute());
        
        expect(result.current.isRouteActive('/tasks')).toBe(true);
        expect(result.current.isRouteActive('/dashboard')).toBe(false);
    });
});