import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectShow from '../Show';
import { useDeleteResource } from '@/shared/hooks/useDeleteResource';

vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
}));

vi.mock('@/shared/ui/backButton', () => ({
    BackButton: ({ children }: { children: React.ReactNode }) => <a href="/projects">{children}</a>,
}));

vi.mock('@/shared/hooks/useDeleteResource', () => ({
    useDeleteResource: vi.fn(),
}));

vi.mock('../ui/ProjectHeader', () => ({
    ProjectHeader: ({ name, onEdit, onDelete }: { name: string; onEdit: () => void; onDelete: () => void }) => (
        <div>
            <h1>{name}</h1>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    ),
}));

vi.mock('@/widgets/index', () => ({
    Comments: () => <div data-testid="comments">Comments Mock</div>,
    CreateProjectModal: ({ isOpen }: { isOpen: boolean }) => (
        isOpen ? <div data-testid="edit-modal">Edit Modal Open</div> : null
    ),
}));

vi.mock('../ui/ProjectTasksList', () => ({ ProjectTasksList: () => <div /> }));
vi.mock('../ui/ProjectTeamList', () => ({ ProjectTeamList: () => <div /> }));

const mockedUseDeleteResource = vi.mocked(useDeleteResource);

describe('ProjectShow Page', () => {
    it('renders project details, triggers delete resource and opens edit modal', () => {
        const mockDelete = vi.fn();
        mockedUseDeleteResource.mockReturnValue({ deleteItem: mockDelete });

        const mockProject: App.Data.ProjectData = {
            id: 1,
            name: 'Awesome Project',
            description: 'Test description',
            tasks: [],
            users: [],
            comments: [],
            created_at: null, 
        } as App.Data.ProjectData;

        render(<ProjectShow project={mockProject} allUsers={[]} />);

        expect(screen.getByText('Awesome Project')).toBeInTheDocument();
        expect(screen.queryByTestId('edit-modal')).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /Edit/i }));
        expect(screen.getByTestId('edit-modal')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
        expect(mockDelete).toHaveBeenCalledWith(1, 'Awesome Project');
    });
});