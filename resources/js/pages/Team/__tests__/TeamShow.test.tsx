import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TeamShow from '../Show';

vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
}));

vi.mock('@/shared/ui/backButton', () => ({
    BackButton: ({ children }: { children: React.ReactNode }) => <a href="/team">{children}</a>,
}));

vi.mock('../ui/TeamProfileHeader', () => ({
    TeamProfileHeader: ({ name, role }: { name: string; role: string }) => (
        <div data-testid="team-profile-header">{name} - {role}</div>
    ),
}));

vi.mock('../ui/TeamTasksList', () => ({
    TeamTasksList: () => <div data-testid="team-tasks-list">Tasks List</div>,
}));

vi.mock('../ui/TeamProjectsList', () => ({
    TeamProjectsList: () => <div data-testid="team-projects-list">Projects List</div>,
}));

describe('TeamShow Page', () => {
    const mockMember = {
        id: 1,
        name: 'Anna Kowalska',
        email: 'anna@example.com',
        role: 'Developer',
        created_at: '2026-01-01',
        tasks: [],
        projects: [],
    };

    it('renders member profile header, tasks, and projects lists correctly', () => {
        render(<TeamShow member={mockMember} />);

        expect(screen.getByTestId('team-profile-header')).toHaveTextContent('Anna Kowalska - Developer');
        expect(screen.getByTestId('team-tasks-list')).toBeInTheDocument();
        expect(screen.getByTestId('team-projects-list')).toBeInTheDocument();
        expect(screen.getByText('Wróć do listy zespołu')).toBeInTheDocument();
    });
});