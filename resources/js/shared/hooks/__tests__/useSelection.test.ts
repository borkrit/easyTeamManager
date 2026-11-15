// resources/js/shared/hooks/__tests__/useSelection.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useSelection } from '../useSelection';

describe('useSelection Hook', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];

    it('toggles single item selection, select all, and clears selection', () => {
        const { result } = renderHook(() => useSelection(items));

        expect(result.current.selectedIds).toEqual([]);

        act(() => {
            result.current.toggleSelectOne(2);
        });
        expect(result.current.selectedIds).toEqual([2]);

        act(() => {
            result.current.toggleSelectOne(2);
        });
        expect(result.current.selectedIds).toEqual([]);

        act(() => {
            result.current.toggleSelectAll(true);
        });
        expect(result.current.selectedIds).toEqual([1, 2, 3]);

        act(() => {
            result.current.toggleSelectAll(false);
        });
        expect(result.current.selectedIds).toEqual([]);

        act(() => {
            result.current.toggleSelectOne(1);
            result.current.clearSelection();
        });
        expect(result.current.selectedIds).toEqual([]);
    });
});