import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTasksIndex } from '../hooks/useTasksIndex';
import { useTaskSelection } from '../hooks/useTaskSelection';
import { UiTask } from '@/widgets/index';

vi.mock('../useTaskSelection', () => ({
    useTaskSelection: vi.fn(),
}));

const mockedUseTaskSelection = vi.mocked(useTaskSelection);

describe('useTasksIndex Hook', () => {
    const mockTasks = [{ id: 1, title: 'Task 1' }] as UiTask[];

    beforeEach(() => {
        mockedUseTaskSelection.mockReturnValue({
            selectedTaskIds: [],
            bulkAction: '',
            setBulkAction: vi.fn(),
            isProcessing: false,
            toggleSelectAll: vi.fn(),
            toggleTaskSelection: vi.fn(),
            handleBulkSubmit: vi.fn(),
        });
    });

    it('manages create and edit modal state properly', () => {
        const { result } = renderHook(() => useTasksIndex(mockTasks));

        expect(result.current.isTaskModalOpen).toBe(false);
        expect(result.current.editingTask).toBeUndefined();

        act(() => {
            result.current.handleOpenCreateModal();
        });
        expect(result.current.isTaskModalOpen).toBe(true);
        expect(result.current.editingTask).toBeUndefined();

        act(() => {
            result.current.handleOpenEditModal(mockTasks[0]);
        });
        expect(result.current.isTaskModalOpen).toBe(true);
        expect(result.current.editingTask).toEqual(mockTasks[0]);

        act(() => {
            result.current.handleCloseModal();
        });
        expect(result.current.isTaskModalOpen).toBe(false);
        expect(result.current.editingTask).toBeUndefined();
    });
});