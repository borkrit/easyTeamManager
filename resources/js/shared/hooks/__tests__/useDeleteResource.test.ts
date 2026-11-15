import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useDeleteResource } from '../useDeleteResource';
import { router } from '@inertiajs/react';

vi.mock('@inertiajs/react', () => ({
    router: {
        delete: vi.fn(),
    },
}));

describe('useDeleteResource Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(window, 'confirm').mockReturnValue(true);
    });

    it('triggers router.delete when confirmation is accepted', () => {
        const onSuccess = vi.fn();
        vi.mocked(router.delete).mockImplementation((_url, options) => {
            options?.onSuccess?.({} as any);
        });

        const { result } = renderHook(() => useDeleteResource('tasks', { onSuccess }));

        act(() => {
            result.current.deleteItem(1, 'Zadanie 1');
        });

        expect(window.confirm).toHaveBeenCalled();
        expect(router.delete).toHaveBeenCalledWith('/tasks/1', expect.any(Object));
        expect(onSuccess).toHaveBeenCalled();
    });
});