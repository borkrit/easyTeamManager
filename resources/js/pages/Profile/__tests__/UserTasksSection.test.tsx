import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UserTasksSection } from '../ui/UserTasksSection';

vi.mock('@/widgets', () => ({
    TaskTable: ({ tasks }: { tasks: { data: App.Data.TaskData[] } }) => (
        <div data-testid="task-table">
            Task Table Mock (Count: {tasks.data.length})
        </div>
    ),
}));

vi.mock('@/shared/ui/pagination', () => ({
    Pagination: ({ total }: { total: number }) => (
        <div data-testid="pagination">Pagination Mock (Total: {total})</div>
    ),
}));

describe('UserTasksSection', () => {
    it('renders section title and total tasks badge', () => {
        const mockTasks = {
            data: [
                { id: 1, title: 'Zadanie 1' },
                { id: 2, title: 'Zadanie 2' },
            ] as App.Data.TaskData[],
            links: [{ url: null, label: '1', active: true }],
            from: 1,
            to: 2,
            total: 2,
        };

        render(<UserTasksSection tasks={mockTasks} />);

        expect(screen.getByText('Twoje zadania')).toBeInTheDocument();
        expect(screen.getByText('Lista zadań przypisanych do Twojego konta')).toBeInTheDocument();
        expect(screen.getByText('Łącznie: 2')).toBeInTheDocument();
        
        expect(screen.getByTestId('task-table')).toBeInTheDocument();
        expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('handles empty or undefined tasks safely', () => {
        render(<UserTasksSection tasks={undefined} />);

        expect(screen.getByText('Łącznie: 0')).toBeInTheDocument();
        expect(screen.getByTestId('task-table')).toBeInTheDocument();
        expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });
});