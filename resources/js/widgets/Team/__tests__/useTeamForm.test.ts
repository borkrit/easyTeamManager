import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTeamForm } from '../hooks/useTeamForm';
import { useApiMutation } from '@/shared/hooks/useApiMutation';
import { useForm } from '@inertiajs/react';

vi.mock('@/shared/hooks/useApiMutation', () => ({
    useApiMutation: vi.fn(),
}));

vi.mock('@inertiajs/react', () => ({
    useForm: vi.fn(),
}));

const mockedUseApiMutation = vi.mocked(useApiMutation);
const mockedUseForm = vi.mocked(useForm);

describe('useTeamForm Hook', () => {
    const mockMutate = vi.fn();
    const mockReset = vi.fn();
    const mockClearErrors = vi.fn();
    const mockSetError = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        mockedUseApiMutation.mockReturnValue({
            mutate: mockMutate,
            isLoading: false,
        });

        mockedUseForm.mockReturnValue({
            data: { name: 'Test', email: 'test@example.com', password: 'secret', role: 'developer' },
            reset: mockReset,
            clearErrors: mockClearErrors,
            setError: mockSetError,
        } as unknown as ReturnType<typeof useForm>);
    });

    it('initializes with modal closed and form values', () => {
        const { result } = renderHook(() => useTeamForm());

        expect(result.current.isModalOpen).toBe(false);
        expect(typeof result.current.setIsModalOpen).toBe('function');
        expect(typeof result.current.handleSubmit).toBe('function');
        expect(result.current.form.data).toEqual({
            name: 'Test',
            email: 'test@example.com',
            password: 'secret',
            role: 'developer',
        });
        expect(result.current.form.processing).toBe(false);
    });

    it('submits form via useApiMutation successfully and resets form/closes modal', () => {
        mockMutate.mockImplementation((_method, _url, _data, options) => {
            options?.onSuccess?.({} as any);
        });

        const { result } = renderHook(() => useTeamForm());

        act(() => {
            result.current.setIsModalOpen(true);
        });
        expect(result.current.isModalOpen).toBe(true);

        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

        act(() => {
            result.current.handleSubmit(mockEvent);
        });

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockMutate).toHaveBeenCalledWith(
            'post',
            '/team',
            expect.any(Object),
            expect.objectContaining({
                onSuccess: expect.any(Function),
                onError: expect.any(Function),
            })
        );

        expect(result.current.isModalOpen).toBe(false);
        expect(mockReset).toHaveBeenCalled();
        expect(mockClearErrors).toHaveBeenCalled();
    });

    it('sets validation errors when mutation fails with onError', () => {
        const validationErrors = { email: 'Email jest zajęty' };

        mockMutate.mockImplementation((_method, _url, _data, options) => {
            options?.onError?.(validationErrors);
        });

        const { result } = renderHook(() => useTeamForm());

        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

        act(() => {
            result.current.handleSubmit(mockEvent);
        });

        expect(mockSetError).toHaveBeenCalledWith(validationErrors);
    });
});