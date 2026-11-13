import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useComments } from '../hooks/useComments';
import { router } from '@inertiajs/react';

const mockSetData = vi.fn();
const mockReset = vi.fn();

vi.mock('@inertiajs/react', () => ({
    useForm: (initialValues: { body: string }) => ({
        data: initialValues,
        setData: mockSetData,
        processing: false,
        reset: mockReset,
        clearErrors: vi.fn(),
        errors: {},
    }),
    router: {
        post: vi.fn(),
        put: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
    },
}));

describe('useComments hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('initializes with default values', () => {
        const { result } = renderHook(() =>
            useComments({ commentableType: 'task', commentableId: 10 })
        );

        expect(result.current.data.body).toBe('');
        expect(result.current.processing).toBe(false);
        expect(result.current.errors).toEqual({});
    });

    it('submits comment form with correct endpoint for task', () => {
        const { result } = renderHook(() =>
            useComments({ commentableType: 'task', commentableId: 42 })
        );

        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

        act(() => {
            result.current.handleSubmit(mockEvent);
        });

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(router.post).toHaveBeenCalledWith(
            '/tasks/42/comments',
            expect.any(Object),
            expect.objectContaining({ onSuccess: expect.any(Function) })
        );
    });

    it('submits comment form with correct endpoint for project', () => {
        const { result } = renderHook(() =>
            useComments({ commentableType: 'project', commentableId: 99 })
        );

        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

        act(() => {
            result.current.handleSubmit(mockEvent);
        });

        expect(router.post).toHaveBeenCalledWith(
            '/projects/99/comments',
            expect.any(Object),
            expect.objectContaining({ onSuccess: expect.any(Function) })
        );
    });
});