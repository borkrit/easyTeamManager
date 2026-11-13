import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TasksIndex from '../Index';
import { UiTask } from '@/widgets/index';

vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
}));

vi.mock('../hooks/useTaskSelection', () => ({
    useTaskSelection: () => ({
        selectedTaskIds: [1],
        bulkAction: '',
        setBulkAction: vi.fn(),
        isProcessing: false,
        toggleSelectAll: vi.fn(),
        toggleTaskSelection: vi.fn(),
        handleBulkSubmit: vi.fn(),
    }),
}));

vi.mock('@/widgets/index', () => ({
    PageHeader: ({ onActionClick }: { onActionClick: () => void }) => (
        <button onClick={onActionClick}>+ Utwórz zadanie</button>
    ),
    TaskFilters: () => <div data-testid="task-filters">Filters Mock</div>,
    TaskTable: ({ onEditTask }: { onEditTask: (task: UiTask) => void }) => (
        <div data-testid="task-table">
            <button onClick={() => onEditTask({ id: 1, title: 'Edit Me' } as UiTask)}>
                Edit Task
            </button>
        </div>
    ),
    CreateTaskModal: ({ isOpen, initialData }: { isOpen: boolean; initialData?: UiTask }) =>
        isOpen ? (
            <div data-testid="task-modal">
                Modal: {initialData ? initialData.title : 'Create'}
            </div>
        ) : null,
}));

vi.mock('../ui/BulkActionsBar', () => ({
    BulkActionsBar: ({ selectedCount }: { selectedCount: number }) => (
        <div data-testid="bulk-bar">Selected: {selectedCount}</div>
    ),
}));

vi.mock('@/shared/ui/pagination', () => ({
    Pagination: () => <div data-testid="pagination">Pagination Mock</div>,
}));

describe('TasksIndex Page', () => {
    const mockPaginatedTasks = {
        data: [{ id: 1, title: 'Task 1' }] as UiTask[],
        links: [],
        from: 1,
        to: 1,
        total: 1,
    };

    it('renders all sections and opens modal for create and edit actions', () => {
        render(<TasksIndex tasks={mockPaginatedTasks} users={[]} filters={{}} />);

        expect(screen.getByTestId('bulk-bar')).toHaveTextContent('Selected: 1');
        expect(screen.getByTestId('task-filters')).toBeInTheDocument();
        expect(screen.getByTestId('task-table')).toBeInTheDocument();
        expect(screen.getByTestId('pagination')).toBeInTheDocument();
        expect(screen.queryByTestId('task-modal')).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /\+ Utwórz zadanie/i }));
        expect(screen.getByTestId('task-modal')).toHaveTextContent('Modal: Create');

        fireEvent.click(screen.getByRole('button', { name: /Edit Task/i }));
        expect(screen.getByTestId('task-modal')).toHaveTextContent('Modal: Edit Me');
    });
});