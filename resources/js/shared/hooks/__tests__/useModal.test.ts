import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useModal } from '../useModal';

describe('useModal Hook', () => {
    it('handles openCreate, openEdit, and close states correctly', () => {
        const { result } = renderHook(() => useModal<{ id: number; name: string }>());

        expect(result.current.isOpen).toBe(false);
        expect(result.current.data).toBeNull();

        act(() => {
            result.current.openCreate();
        });
        expect(result.current.isOpen).toBe(true);
        expect(result.current.data).toBeNull();

        act(() => {
            result.current.openEdit({ id: 1, name: 'Projekt Testowy' });
        });
        expect(result.current.isOpen).toBe(true);
        expect(result.current.data).toEqual({ id: 1, name: 'Projekt Testowy' });

        act(() => {
            result.current.close();
        });
        expect(result.current.isOpen).toBe(false);
        expect(result.current.data).toBeNull();
    });
});