import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useTaskColumns } from '../hooks/useTaskColumns';

function TestColumnRenderer({ onEdit }: { onEdit: (task: any) => void }) {
    const columns = useTaskColumns({ onEditTask: onEdit });
    const mockTask = {
        id: 1,
        title: 'Test Task',
        projectName: 'Alpha',
        assigneeName: 'Jan Kowalski',
        status: 'w_trakcie',
        priority: 'wysoki',
    };

    const actionsColumn = columns.find((c: any) => c.id === 'actions' || c.accessorKey === 'actions');
    
    const cellRenderer = (actionsColumn as any)?.cell || (actionsColumn as any)?.columnDef?.cell;

    return (
        <div>
            {cellRenderer ? cellRenderer({ row: { original: mockTask } }) : 'No actions column'}
        </div>
    );
}

describe('useTaskColumns', () => {
    it('returns columns including actions with edit trigger', () => {
        const handleEdit = vi.fn();
        render(<TestColumnRenderer onEdit={handleEdit} />);

        const editButton = screen.getByRole('button', { name: /edytuj/i });
        expect(editButton).toBeInTheDocument();

        fireEvent.click(editButton);
        expect(handleEdit).toHaveBeenCalledTimes(1);
        expect(handleEdit).toHaveBeenCalledWith(
            expect.objectContaining({ id: 1, title: 'Test Task' })
        );
    });
});