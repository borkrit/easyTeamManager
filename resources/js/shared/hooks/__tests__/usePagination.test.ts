import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePagination } from '../usePagination';

describe('usePagination Hook', () => {
    it('returns shouldShow false when links array has 3 or fewer items', () => {
        const links = [
            { url: null, label: 'Previous', active: false },
            { url: '/page/1', label: '1', active: true },
            { url: null, label: 'Next', active: false },
        ];

        const { result } = renderHook(() => usePagination(links));
        expect(result.current.shouldShow).toBe(false);
        expect(result.current.prevUrl).toBeNull();
        expect(result.current.nextUrl).toBeNull();
    });

    it('returns shouldShow true and correct urls when links array exceeds 3 items', () => {
        const links = [
            { url: '/page/prev', label: 'Previous', active: false },
            { url: '/page/1', label: '1', active: true },
            { url: '/page/2', label: '2', active: false },
            { url: '/page/next', label: 'Next', active: false },
        ];

        const { result } = renderHook(() => usePagination(links));
        expect(result.current.shouldShow).toBe(true);
        expect(result.current.prevUrl).toBe('/page/prev');
        expect(result.current.nextUrl).toBe('/page/next');
    });
});