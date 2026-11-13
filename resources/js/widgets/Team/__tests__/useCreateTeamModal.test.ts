import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCreateTeamModal } from '../hooks/useCreateTeamModal';
import { useApiMutation } from '@/shared/hooks/useApiMutation';
import { CreateTeamModalProps } from '../types/types';

vi.mock('@/shared/hooks/useApiMutation', () => ({
    useApiMutation: vi.fn(),
}));

describe('useCreateTeamModal', () => {
    const mockMutate = vi.fn();
    const mockOnClose = vi.fn();

    const defaultProps = {
        isOpen: true,
        onClose: mockOnClose,
        team: null,
    } as unknown as CreateTeamModalProps;

    const existingTeam = {
        id: 1,
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        role: 'admin',
    } as any;

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(useApiMutation).mockReturnValue({
            mutate: mockMutate,
            isLoading: false,
        } as any);
    });

    it('initializes with default values in create mode', () => {
        const { result } = renderHook(() => useCreateTeamModal(defaultProps));

        expect(result.current.isEditing).toBe(false);
        expect(result.current.data).toEqual({
            name: '',
            email: '',
            password: '',
            role: 'developer',
        });
        expect(result.current.errors).toEqual({});
        expect(result.current.processing).toBe(false);
    });

    it('initializes with team data when team is provided', () => {
        const { result } = renderHook(() =>
            useCreateTeamModal({
                ...defaultProps,
                team: existingTeam,
            })
        );

        expect(result.current.isEditing).toBe(true);
        expect(result.current.data).toEqual({
            name: 'Jan Kowalski',
            email: 'jan@example.com',
            password: '',
            role: 'admin',
        });
        expect(result.current.errors).toEqual({});
    });

    it('updates field value via setData', () => {
        const { result } = renderHook(() => useCreateTeamModal(defaultProps));

        act(() => {
            result.current.setData('name', 'Anna Nowak');
            result.current.setData('email', 'anna@example.com');
        });

        expect(result.current.data.name).toBe('Anna Nowak');
        expect(result.current.data.email).toBe('anna@example.com');
    });

    it('resets form data and errors when modal reopens', () => {
        const { result, rerender } = renderHook(
            (props: CreateTeamModalProps) => useCreateTeamModal(props),
            { initialProps: { ...defaultProps, isOpen: false } }
        );

        act(() => {
            result.current.setData('name', 'Temp Name');
            result.current.handleSubmit({ preventDefault: vi.fn() } as any);
        });

        const { onError } = mockMutate.mock.calls[0][3];
        act(() => {
            onError({ name: 'Pole wymagane' });
        });

        expect(result.current.errors).toEqual({ name: 'Pole wymagane' });

        rerender({ ...defaultProps, isOpen: true, team: null });

        expect(result.current.data).toEqual({
            name: '',
            email: '',
            password: '',
            role: 'developer',
        });
        expect(result.current.errors).toEqual({});
    });

    it('populates form with team data when reopened in edit mode', () => {
        const { result, rerender } = renderHook(
            (props: CreateTeamModalProps) => useCreateTeamModal(props),
            { initialProps: { ...defaultProps, isOpen: false, team: null } }
        );

        rerender({ ...defaultProps, isOpen: true, team: existingTeam });

        expect(result.current.isEditing).toBe(true);
        expect(result.current.data).toEqual({
            name: 'Jan Kowalski',
            email: 'jan@example.com',
            password: '',
            role: 'admin',
        });
    });

    it('sends POST request to /team on submit in create mode', () => {
        const { result } = renderHook(() => useCreateTeamModal(defaultProps));
        const preventDefault = vi.fn();

        act(() => {
            result.current.setData('name', 'Anna Nowak');
            result.current.setData('email', 'anna@example.com');
            result.current.setData('password', 'secret123');
        });

        act(() => {
            result.current.handleSubmit({ preventDefault } as any);
        });

        expect(preventDefault).toHaveBeenCalled();
        expect(mockMutate).toHaveBeenCalledWith(
            'post',
            '/team',
            {
                name: 'Anna Nowak',
                email: 'anna@example.com',
                password: 'secret123',
                role: 'developer',
            },
            expect.objectContaining({
                onSuccess: expect.any(Function),
                onError: expect.any(Function),
            })
        );
    });

    it('sends PUT request to /team/:id on submit in edit mode', () => {
        const { result } = renderHook(() =>
            useCreateTeamModal({
                ...defaultProps,
                team: existingTeam,
            })
        );
        const preventDefault = vi.fn();

        act(() => {
            result.current.setData('name', 'Jan Kowalski Updated');
        });

        act(() => {
            result.current.handleSubmit({ preventDefault } as any);
        });

        expect(preventDefault).toHaveBeenCalled();
        expect(mockMutate).toHaveBeenCalledWith(
            'put',
            '/team/1',
            {
                name: 'Jan Kowalski Updated',
                email: 'jan@example.com',
                password: '',
                role: 'admin',
            },
            expect.objectContaining({
                onSuccess: expect.any(Function),
                onError: expect.any(Function),
            })
        );
    });

    it('calls onClose on successful mutation', () => {
        const { result } = renderHook(() => useCreateTeamModal(defaultProps));

        act(() => {
            result.current.handleSubmit({ preventDefault: vi.fn() } as any);
        });

        const { onSuccess } = mockMutate.mock.calls[0][3];
        act(() => {
            onSuccess();
        });

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('sets validation errors when mutation fails', () => {
        const { result } = renderHook(() => useCreateTeamModal(defaultProps));

        act(() => {
            result.current.handleSubmit({ preventDefault: vi.fn() } as any);
        });

        const { onError } = mockMutate.mock.calls[0][3];
        act(() => {
            onError({ email: 'Email jest już zajęty' });
        });

        expect(result.current.errors).toEqual({ email: 'Email jest już zajęty' });
        expect(mockOnClose).not.toHaveBeenCalled();
    });
});