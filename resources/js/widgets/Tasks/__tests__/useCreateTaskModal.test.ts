import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCreateTaskModal } from '../hooks/useCreateTaskModal';


const mockMutate = vi.fn();
vi.mock('@/shared/hooks/useApiMutation', () => ({
    useApiMutation: () => ({
        mutate: mockMutate,
        isLoading: false,
    }),
}));

describe('useCreateTaskModal', () => {
    const mockProjects = [
        {
            id: 1,
            name: 'Projekt Alpha',
            users: [{ id: 10, name: 'Jan Kowalski' }],
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('initializes in create mode with default values', () => {
        const { result } = renderHook(() =>
            useCreateTaskModal({
                isOpen: true,
                onClose: () => {},
                projects: mockProjects,
                users: [],
            })
        );

        expect(result.current.isEditing).toBe(false);
        expect(result.current.data.status).toBe('do_zrobienia');
        expect(result.current.data.priority).toBe('sredni');
        expect(result.current.availableUsers).toEqual([{ id: 10, name: 'Jan Kowalski' }]);
        expect(result.current.hasNoUsers).toBe(false);
    });

    it('initializes in edit mode and populates data from task', () => {
        const mockTask = {
            id: 123,
            title: 'Zadanie testowe',
            description: 'Opis testowy',
            status: 'w_trakcie',
            priority: 'wysoki',
            project_id: 1,
            user_id: 10,
        };

        const { result } = renderHook(() =>
            useCreateTaskModal({
                isOpen: true,
                onClose: () => {},
                task: mockTask as any,
                projects: mockProjects,
                users: [],
            })
        );

        expect(result.current.isEditing).toBe(true);
        expect(result.current.data.title).toBe('Zadanie testowe');
        expect(result.current.data.status).toBe('w_trakcie');
        expect(result.current.data.priority).toBe('wysoki');
    });

    it('calls mutate with put and correct url on edit form submission', () => {
        const mockTask = {
            id: 123,
            title: 'Zadanie do edycji',
            project_id: 1,
        };

        const { result } = renderHook(() =>
            useCreateTaskModal({
                isOpen: true,
                onClose: () => {},
                task: mockTask as any,
                projects: mockProjects,
                users: [],
            })
        );

        const mockEvent = { preventDefault: () => {} } as React.FormEvent;

        act(() => {
            result.current.handleSubmit(mockEvent);
        });

        expect(mockMutate).toHaveBeenCalledTimes(1);
        expect(mockMutate).toHaveBeenCalledWith(
            'put',
            '/tasks/123',
            expect.objectContaining({ title: 'Zadanie do edycji' }),
            expect.any(Object)
        );
    });
});