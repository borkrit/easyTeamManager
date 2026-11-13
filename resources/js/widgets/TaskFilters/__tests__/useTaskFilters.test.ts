import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useTaskFilters } from '../hooks/useTaskFilters';

const mockGet = vi.fn();
vi.mock('@inertiajs/react', () => ({
    router: {
        get: (...args: any[]) => mockGet(...args),
    },
}));

describe('useTaskFilters hook', () => {
    it('initializes with correct filter values', () => {
        const { result } = renderHook(() => useTaskFilters({ 
            filters: { search: 'projekt', status: 'do_zrobienia' } 
        }));

        expect(result.current.search).toBe('projekt');
        expect(result.current.status).toBe('do_zrobienia');
        expect(result.current.hasActiveFilters).toBe(true);
    });

    it('resets all filters properly', () => {
        const { result } = renderHook(() => useTaskFilters({ 
            filters: { search: 'test', status: 'w_trakcie' } 
        }));

        act(() => {
            result.current.handleReset();
        });

        expect(result.current.search).toBe('');
        expect(result.current.status).toBe('');
        expect(result.current.hasActiveFilters).toBe(false);
    });
});