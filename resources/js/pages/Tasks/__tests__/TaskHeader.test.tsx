
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskHeader } from '../ui/TaskHeader';

describe('TaskHeader', () => {
    it('renders task title, status badge and project badge correctly', () => {
        const mockTask: App.Data.TaskData = {
            id: 1,
            title: 'Naprawić błąd routingu',
            status: 'w_trakcie' as App.Enums.TaskStatus,
            projectName: 'Moduł Auth',
        } as App.Data.TaskData;

        render(<TaskHeader task={mockTask} onEditClick={vi.fn()} />);

        expect(screen.getByText('W trakcie')).toBeInTheDocument();
        expect(screen.getByText('Projekt: Moduł Auth')).toBeInTheDocument();
        expect(screen.getByText('Naprawić błąd routingu')).toBeInTheDocument();
    });

    it('triggers onEditClick when edit button is clicked', () => {
        const handleEdit = vi.fn();
        const mockTask: App.Data.TaskData = {
            id: 1,
            title: 'Test Task',
            status: 'do_zrobienia' as App.Enums.TaskStatus,
        } as App.Data.TaskData;

        render(<TaskHeader task={mockTask} onEditClick={handleEdit} />);

        fireEvent.click(screen.getByRole('button', { name: /Edytuj zadanie/i }));
        expect(handleEdit).toHaveBeenCalledTimes(1);
    });
});