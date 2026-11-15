import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useApiMutation } from '../useApiMutation';
import { router } from '@inertiajs/react';

vi.mock('@inertiajs/react', () => ({
    router: {
        post: vi.fn(),
        put: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
    },
}));

describe('useApiMutation Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('performs mutation and manages isLoading state correctly', () => {
        vi.mocked(router.post).mockImplementation((_url, _data, options) => {
            options?.onSuccess?.({} as any);
            options?.onFinish?.({} as any);
        });

        const { result } = renderHook(() => useApiMutation());

        expect(result.current.isLoading).toBe(false);

        act(() => {
            result.current.mutate('post', '/test-endpoint', { name: 'Test' });
        });

        expect(router.post).toHaveBeenCalledWith(
            '/test-endpoint',
            { name: 'Test' },
            expect.objectContaining({
                preserveScroll: true,
                preserveState: true,
            })
        );
        expect(result.current.isLoading).toBe(false);
    });
});