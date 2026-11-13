import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useTeamColumns } from '../hooks/useTeamColumns';

function TestColumnRenderer({ onDelete }: { onDelete: (id: number, name: string) => void }) {
    const columns = useTeamColumns({ onDelete });
    const mockUser = {
        id: 1,
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        role: 'admin',
        projects_count: 2,
        tasks_count: 5,
        created_at: '2026-01-01T00:00:00.000Z',
    };

    const actionsColumn = columns.find((c: any) => c.id === 'actions' || c.accessorKey === 'actions');
    const cellRenderer = (actionsColumn as any)?.cell || (actionsColumn as any)?.columnDef?.cell;

    return (
        <div>
            {cellRenderer ? cellRenderer({ row: { original: mockUser } }) : 'No actions'}
        </div>
    );
}

describe('useTeamColumns', () => {
    it('renders delete and details actions correctly', () => {
        const handleDelete = vi.fn();
        render(<TestColumnRenderer onDelete={handleDelete} />);

        const deleteButton = screen.getByRole('button', { name: /usuń/i });
        expect(deleteButton).toBeInTheDocument();

        fireEvent.click(deleteButton);
        expect(handleDelete).toHaveBeenCalledTimes(1);
        expect(handleDelete).toHaveBeenCalledWith(1, 'Jan Kowalski');
    });
});