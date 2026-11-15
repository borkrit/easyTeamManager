import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTaskShow } from '../hooks/useTaskShow';

describe('useTaskShow Hook', () => {
    it('opens and closes edit modal correctly', () => {
        const { result } = renderHook(() => useTaskShow());

        expect(result.current.isEditModalOpen).toBe(false);

        act(() => {
            result.current.openEditModal();
        });
        expect(result.current.isEditModalOpen).toBe(true);

        act(() => {
            result.current.closeEditModal();
        });
        expect(result.current.isEditModalOpen).toBe(false);
    });
});