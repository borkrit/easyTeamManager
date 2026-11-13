import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TeamTable } from '../TeamTable';

vi.mock('@/shared/hooks/useDeleteResource', () => ({
    useDeleteResource: () => ({ deleteItem: vi.fn() }),
}));

describe('TeamTable', () => {
    const mockUsers = [
        {
            id: 1,
            name: 'Jan Kowalski',
            email: 'jan@example.com',
            role: 'admin',
            projects_count: 2,
            tasks_count: 3,
            created_at: '2026-01-01T00:00:00.000Z' as any,
        },
    ];

    it('renders team members correctly', () => {
        render(<TeamTable users={mockUsers} />);

        expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
        expect(screen.getByText('jan@example.com')).toBeInTheDocument();
        expect(screen.getByText('admin')).toBeInTheDocument();
    });

    it('renders empty state text when users array is empty', () => {
        render(<TeamTable users={[]} />);
        expect(screen.getByText('Brak członków zespołu w bazie.')).toBeInTheDocument();
    });
});