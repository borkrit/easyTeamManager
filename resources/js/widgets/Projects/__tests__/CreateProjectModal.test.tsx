import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CreateProjectModal } from '../CreateProjectModal';

vi.mock('./hooks/useCreateProjectModal', () => ({
    useCreateProjectModal: () => ({
        isEditing: false,
        data: { name: '', description: '', user_ids: [] },
        setData: vi.fn(),
        processing: false,
        errors: {},
        handleSubmit: (e: any) => e.preventDefault(),
        toggleUser: vi.fn(),
    }),
}));

describe('CreateProjectModal Component', () => {
    const mockUsers = [
        { id: 1, name: 'Jan Kowalski' },
        { id: 2, name: 'Anna Nowak' },
    ];

    it('renders modal correctly when open', () => {
        render(
            <CreateProjectModal
                isOpen={true}
                onClose={vi.fn()}
                users={mockUsers}
            />
        );

        expect(screen.getByText('Utwórz nowy projekt')).toBeInTheDocument();
        expect(screen.getByText('Nazwa projektu')).toBeInTheDocument();
        expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
        expect(screen.getByText('Anna Nowak')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
        const { container } = render(
            <CreateProjectModal
                isOpen={false}
                onClose={vi.fn()}
                users={mockUsers}
            />
        );

        expect(container).toBeEmptyDOMElement();
    });
});