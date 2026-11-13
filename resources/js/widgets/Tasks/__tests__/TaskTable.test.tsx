import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskTable } from '../TaskTable';
import { UiTask } from '../types/types';

const mockTasks = {
    data: [
        {
            id: 1,
            title: 'Test Task 1',
            projectName: 'Project Alpha',
            assigneeName: 'Jan Kowalski',
            status: 'w_trakcie',
            priority: 'wysoki',
        },
    ] as unknown as UiTask[],
};

describe('TaskTable', () => {
    it('renders tasks with correct data and status badges', () => {
        render(<TaskTable tasks={mockTasks} selectable={false} />);

        expect(screen.getByText('Test Task 1')).toBeInTheDocument();
        expect(screen.getByText('Project Alpha')).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes('Jan Kowalski'))).toBeInTheDocument();
        expect(screen.getByText('W trakcie')).toBeInTheDocument();
        expect(screen.getByText('Wysoki')).toBeInTheDocument(); 
    });

    it('calls onEditTask when edit button is clicked', () => {
        const handleEdit = vi.fn();
        render(<TaskTable tasks={mockTasks} selectable={false} onEditTask={handleEdit} />);

        const editButton = screen.getByRole('button', { name: /edytuj/i });
        fireEvent.click(editButton);

        expect(handleEdit).toHaveBeenCalledTimes(1);
        expect(handleEdit).toHaveBeenCalledWith(mockTasks.data[0]);
    });
});