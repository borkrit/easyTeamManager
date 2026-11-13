import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DashboardRecentTasks } from '../ui/DashboardRecentTasks';

vi.mock('@inertiajs/react', () => ({
    Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    ),
}));

describe('DashboardRecentTasks', () => {
    const mockTasks: App.Data.TaskData[] = [
        {
            id: 1,
            title: 'Naprawa błędu logowania',
            description: null,
            status: 'zakonczone' ,
            priority: 'wysoki',
            user_id: 1,
            user: null,
            project_id: 1,
            projectName: 'E-commerce App',
            assigneeName: 'Jan Kowalski',
            comments: [],
            created_at: null,
        },
        {
            id: 2,
            title: 'Projekt bazy danych',
            description: null,
            status: 'w_trakcie',
            priority: 'sredni' ,
            user_id: 1,
            user: null,
            project_id: 1,
            projectName: 'CRM System',
            assigneeName: 'Anna Nowak',
            comments: [],
            created_at: null,
        },
    ];

    it('renders list of recent tasks with correct statuses', () => {
        render(<DashboardRecentTasks recentTasks={mockTasks} />);

        expect(screen.getByText('Ostatnio dodane zadania')).toBeInTheDocument();
        expect(screen.getByText('Naprawa błędu logowania')).toBeInTheDocument();
        expect(screen.getByText('E-commerce App')).toBeInTheDocument();
        expect(screen.getByText('Ukończone')).toBeInTheDocument();

        expect(screen.getByText('Projekt bazy danych')).toBeInTheDocument();
        expect(screen.getByText('W trakcie')).toBeInTheDocument();
    });

    it('renders empty state message when recentTasks array is empty', () => {
        render(<DashboardRecentTasks recentTasks={[]} />);

        expect(screen.getByText('Brak ostatnich zadań w systemie.')).toBeInTheDocument();
    });
});