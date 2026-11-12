import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useProjectTable } from '../hooks/useProjectTable';

const mockDelete = vi.fn();
vi.mock('@/shared/hooks/useDeleteResource', () => ({
    useDeleteResource: () => ({
        deleteItem: mockDelete,
    }),
}));

describe('useProjectTable hook', () => {
    it('returns columns configuration', () => {
        const { result } = renderHook(() => useProjectTable());

        expect(result.current.columns).toBeDefined();
        expect(result.current.columns.length).toBeGreaterThan(0);
        expect(result.current.columns[0].header).toBe('Nazwa projektu');
    });
});