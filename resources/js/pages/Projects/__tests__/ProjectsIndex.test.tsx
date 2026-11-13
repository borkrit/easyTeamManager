import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectsIndex from '../Index';

vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
}));

vi.mock('@/widgets/index', () => ({
    PageHeader: ({ onActionClick }: { onActionClick: () => void }) => (
        <button onClick={onActionClick}>Nowy projekt</button>
    ),
    ProjectTable: () => <div data-testid="project-table">Table Mock</div>,
    CreateProjectModal: ({ isOpen }: { isOpen: boolean }) => (
        isOpen ? <div data-testid="create-modal">Modal Open</div> : null
    ),
}));

describe('ProjectsIndex Page', () => {
    it('renders page header and project table, and opens create modal on action click', () => {
        const mockProjects = [{ id: 1, name: 'Project Alpha' }] as any[];
        const mockUsers = [{ id: 1, name: 'Admin' }];

        render(<ProjectsIndex projects={mockProjects} users={mockUsers} />);

        expect(screen.getByTestId('project-table')).toBeInTheDocument();
        expect(screen.queryByTestId('create-modal')).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /Nowy projekt/i }));
        expect(screen.getByTestId('create-modal')).toBeInTheDocument();
    });
});