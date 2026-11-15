import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TaskDetailsSidebar } from '../ui/TaskDetailsSidebar';

describe('TaskDetailsSidebar', () => {
    it('renders task details, badge for priority, assignee, project and formatted date correctly', () => {
        const mockTask: App.Data.TaskData = {
            id: 1,
            title: 'Task Title',
            priority: 'wysoki' as App.Enums.TaskPriority,
            assigneeName: 'Jan Kowalski',
            projectName: 'EasyTask Project',
            created_at: '2026-06-15T10:00:00.000000Z',
        } as unknown as App.Data.TaskData;

        render(<TaskDetailsSidebar task={mockTask} />);

        expect(screen.getByText('Szczegóły')).toBeInTheDocument();
        expect(screen.getByText('Wysoki')).toBeInTheDocument();
        expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
        expect(screen.getByText('EasyTask Project')).toBeInTheDocument();
        expect(screen.getByText(/15/)).toBeInTheDocument();
        expect(screen.getByText(/2026/)).toBeInTheDocument();
    });

    it('renders fallback values when priority, assignee, project or date are missing', () => {
        const emptyTask = {
            id: 2,
            title: 'Empty Task',
            priority: null,
            assigneeName: null,
            projectName: null,
            created_at: null,
        } as unknown as App.Data.TaskData;

        render(<TaskDetailsSidebar task={emptyTask} />);

        expect(screen.getByText('Brak')).toBeInTheDocument(); 
        expect(screen.getByText('Nie przypisano')).toBeInTheDocument(); 
        expect(screen.getByText('Brak projektu')).toBeInTheDocument(); 
        expect(screen.getByText('-')).toBeInTheDocument(); 
    });
});