import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTaskSelection } from '../hooks/useTaskSelection';
import { useApiMutation } from '@/shared/hooks/useApiMutation';

vi.mock('@/shared/hooks/useApiMutation', () => ({
    useApiMutation: vi.fn(),
}));

const mockedUseApiMutation = vi.mocked(useApiMutation);

describe('useTaskSelection Hook', () => {
    const mockMutate = vi.fn();
    const mockTasks = [
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' },
    ] as App.Data.TaskData[];

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseApiMutation.mockReturnValue({
            mutate: mockMutate,
            isLoading: false,
        });
    });

    it('toggles single task selection and select all properly', () => {
        const { result } = renderHook(() => useTaskSelection(mockTasks));

        expect(result.current.selectedTaskIds).toEqual([]);

        act(() => {
            result.current.toggleTaskSelection(1);
        });
        expect(result.current.selectedTaskIds).toEqual([1]);

        act(() => {
            result.current.toggleTaskSelection(1);
        });
        expect(result.current.selectedTaskIds).toEqual([]);

        act(() => {
            result.current.toggleSelectAll(true);
        });
        expect(result.current.selectedTaskIds).toEqual([1, 2]);

        act(() => {
            result.current.toggleSelectAll(false);
        });
        expect(result.current.selectedTaskIds).toEqual([]);
    });

    it('does not submit bulk action when action is empty or no tasks selected', () => {
        const { result } = renderHook(() => useTaskSelection(mockTasks));
        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

        act(() => {
            result.current.handleBulkSubmit(mockEvent);
        });

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockMutate).not.toHaveBeenCalled();
    });

    it('submits bulk action and resets state on success', () => {
        mockMutate.mockImplementation((_method, _url, _data, options) => {
            options?.onSuccess?.();
        });

        const { result } = renderHook(() => useTaskSelection(mockTasks));
        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

        act(() => {
            result.current.toggleTaskSelection(1);
            result.current.setBulkAction('delete');
        });

        act(() => {
            result.current.handleBulkSubmit(mockEvent);
        });

        expect(mockMutate).toHaveBeenCalledWith(
            'post',
            '/tasks/bulk-action',
            {
                action: 'delete',
                task_ids: [1],
            },
            expect.objectContaining({
                onSuccess: expect.any(Function),
            })
        );

        expect(result.current.selectedTaskIds).toEqual([]);
        expect(result.current.bulkAction).toBe('');
    });
});