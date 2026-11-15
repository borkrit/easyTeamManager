import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTableFilters } from '../useTableFilters';
import { router } from '@inertiajs/react';

vi.mock('@inertiajs/react', () => ({
    router: {
        get: vi.fn(),
    },
}));

describe('useTableFilters Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('updates filters and triggers router.get on filter change', () => {
        const { result } = renderHook(() => useTableFilters({ search: '' }));

        act(() => {
            result.current.handleFilterChange('search', 'Laravel');
        });

        expect(result.current.filters).toEqual({ search: 'Laravel' });
        expect(router.get).toHaveBeenCalledWith(
            window.location.pathname,
            { search: 'Laravel', page: 1 },
            expect.objectContaining({
                preserveState: true,
                preserveScroll: true,
                replace: true,
            })
        );
    });

    it('resets filters correctly and triggers router.get', () => {
        const { result } = renderHook(() => useTableFilters({ search: 'Laravel', status: 'active' }));

        act(() => {
            result.current.handleReset();
        });

        expect(result.current.filters).toEqual({ search: '', status: '' });
        expect(router.get).toHaveBeenCalledWith(
            window.location.pathname,
            {},
            expect.objectContaining({
                preserveState: true,
                preserveScroll: true,
                replace: true,
            })
        );
    });
});