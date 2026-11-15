import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFormModal } from '../useFormModal';
import { useForm } from '@inertiajs/react';

vi.mock('@inertiajs/react', () => ({
    useForm: vi.fn(),
}));

const mockedUseForm = vi.mocked(useForm);

describe('useFormModal Hook', () => {
    const mockSetData = vi.fn();
    const mockClearErrors = vi.fn();
    const mockPost = vi.fn();
    const mockPut = vi.fn();
    const mockReset = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseForm.mockReturnValue({
            data: { name: '' },
            setData: mockSetData,
            clearErrors: mockClearErrors,
            post: mockPost,
            put: mockPut,
            reset: mockReset,
            errors: {},
            hasErrors: false,
            processing: false,
        } as unknown as ReturnType<typeof useForm>);
    });

    it('sets initial data and clears errors when modal opens with initial data', () => {
        const defaultValues = { name: '' };
        const initialData = { name: 'Test Project' };

        renderHook(() =>
            useFormModal({
                isOpen: true,
                onClose: vi.fn(),
                initialData,
                defaultValues,
                submitUrl: '/projects',
                isEditing: true,
            })
        );

        expect(mockSetData).toHaveBeenCalledWith(initialData);
        expect(mockClearErrors).toHaveBeenCalled();
    });

    it('submits via put when isEditing is true', () => {
        const onClose = vi.fn();
        mockPut.mockImplementation((_url, options) => {
            options?.onSuccess?.();
        });

        const { result } = renderHook(() =>
            useFormModal({
                isOpen: true,
                onClose,
                initialData: { id: 1, name: 'Edit' },
                defaultValues: { name: '' },
                submitUrl: '/projects/1',
                isEditing: true,
            })
        );

        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

        act(() => {
            result.current.handleSubmit(mockEvent);
        });

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockPut).toHaveBeenCalledWith('/projects/1', expect.any(Object));
        expect(onClose).toHaveBeenCalled();
        expect(mockReset).toHaveBeenCalled();
    });

    it('submits via post when isEditing is false', () => {
        const onClose = vi.fn();
        mockPost.mockImplementation((_url, options) => {
            options?.onSuccess?.();
        });

        const { result } = renderHook(() =>
            useFormModal({
                isOpen: true,
                onClose,
                initialData: null,
                defaultValues: { name: '' },
                submitUrl: '/projects',
                isEditing: false,
            })
        );

        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

        act(() => {
            result.current.handleSubmit(mockEvent);
        });

        expect(mockPost).toHaveBeenCalledWith('/projects', expect.any(Object));
        expect(onClose).toHaveBeenCalled();
    });
});