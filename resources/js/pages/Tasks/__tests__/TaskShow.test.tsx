import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskShow from '../Show';

vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
}));

vi.mock('@/shared/ui/backButton', () => ({
    BackButton: ({ children }: { children: React.ReactNode }) => <a href="/tasks">{children}</a>,
}));

vi.mock('../ui/TaskHeader', () => ({
    TaskHeader: ({ task, onEditClick }: { task: App.Data.TaskData; onEditClick: () => void }) => (
        <div>
            <h1>{task.title}</h1>
            <button onClick={onEditClick}>Edytuj zadanie</button>
        </div>
    ),
}));

vi.mock('../ui/TaskDetailsSidebar', () => ({
    TaskDetailsSidebar: () => <div data-testid="task-sidebar">Sidebar Mock</div>,
}));

vi.mock('@/widgets/index', () => ({
    Comments: () => <div data-testid="comments">Comments Mock</div>,
    CreateTaskModal: ({ isOpen }: { isOpen: boolean }) =>
        isOpen ? <div data-testid="edit-task-modal">Edit Modal Open</div> : null,
}));

describe('TaskShow Page', () => {
    const baseTask = {
        id: 10,
        title: 'Wdrożyć testy Vitest',
        description: 'Szczegółowy opis zadania',
        comments: [],
    } as unknown as App.Data.TaskData;

    it('renders task details, description, sidebar and opens edit modal on click', () => {
        render(<TaskShow task={baseTask} />);

        expect(screen.getByText('Wdrożyć testy Vitest')).toBeInTheDocument();
        expect(screen.getByText('Szczegółowy opis zadania')).toBeInTheDocument();
        expect(screen.getByTestId('task-sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('comments')).toBeInTheDocument();
        expect(screen.queryByTestId('edit-task-modal')).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /Edytuj zadanie/i }));
        expect(screen.getByTestId('edit-task-modal')).toBeInTheDocument();
    });

    it('renders fallback message when task description is empty', () => {
        const taskWithoutDesc = { ...baseTask, description: null } as unknown as App.Data.TaskData;

        render(<TaskShow task={taskWithoutDesc} />);

        expect(screen.getByText('Brak opisu dla tego zadania.')).toBeInTheDocument();
    });
});