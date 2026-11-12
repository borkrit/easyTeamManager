import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCreateProjectModal } from '../hooks/useCreateProjectModal';

const mockMutate = vi.fn();
vi.mock('@/shared/lib/hooks/useApiMutation', () => ({
    useApiMutation: () => ({
        mutate: mockMutate,
        isLoading: false,
    }),
}));

vi.mock('@inertiajs/react', () => ({
    useForm: (initialValues: any) => {
        let data = initialValues;
        return {
            data: () => data,
            setData: (keyOrData: any, value?: any) => {
                if (typeof keyOrData === 'string') {
                    data[keyOrData] = value;
                } else {
                    data = keyOrData;
                }
            },
            processing: false,
            errors: {},
            reset: vi.fn(() => { data = initialValues; }),
            clearErrors: vi.fn(),
        };
    },
}));

describe('useCreateProjectModal hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('initializes in creation mode when initialData is null', () => {
        const { result } = renderHook(() =>
            useCreateProjectModal({ isOpen: true, onClose: vi.fn() })
        );

        expect(result.current.isEditing).toBe(false);
    });

    it('initializes in editing mode when initialData has id', () => {
        const initialData = { id: 1, name: 'Test Project', description: 'Desc' };
        const { result } = renderHook(() =>
            useCreateProjectModal({ isOpen: true, onClose: vi.fn(), initialData })
        );

        expect(result.current.isEditing).toBe(true);
        expect(result.current.data.name).toBe('Test Project');
    });

    it('calls mutate with post method on create submit', () => {
        const onClose = vi.fn();
        const { result } = renderHook(() =>
            useCreateProjectModal({ isOpen: true, onClose })
        );

        act(() => {
            result.current.setData('name', 'New Project');
        });

        act(() => {
            const e = { preventDefault: vi.fn() } as unknown as React.FormEvent;
            result.current.handleSubmit(e);
        });

        expect(mockMutate).toHaveBeenCalledWith(
            'post',
            '/projects',
            expect.objectContaining({ name: 'New Project' }),
            expect.any(Object)
        );
    });
});