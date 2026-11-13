import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTaskModal } from '../CreateTaskModal';

const mockMutate = vi.fn();
const mockOnClose = vi.fn();
const mockSetData = vi.fn();

let mockHookReturn = {
    isEditing: false,
    data: {
        title: '',
        description: '',
        status: 'do_zrobienia',
        priority: 'sredni',
        project_id: 1,
        user_id: '',
    },
    setData: mockSetData,
    processing: false,
    errors: {},
    availableUsers: [{ id: 10, name: 'Jan Kowalski' }],
    hasNoUsers: false,
    handleSubmit: (e: React.FormEvent) => {
        e.preventDefault();
        mockMutate();
    },
};

vi.mock('./hooks/useCreateTaskModal', () => ({
    useCreateTaskModal: () => mockHookReturn,
}));

describe('CreateTaskModal', () => {
    const mockProjects = [{ id: 1, name: 'Projekt Alpha' }];

    beforeEach(() => {
        vi.clearAllMocks();
        mockHookReturn.isEditing = false;
        mockHookReturn.processing = false;
        mockHookReturn.errors = {};
    });

    it('renders nothing when isOpen is false', () => {
        const { container } = render(
            <CreateTaskModal
                isOpen={false}
                onClose={mockOnClose}
                projects={mockProjects}
                users={[]}
            />
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('renders modal with title and form fields when isOpen is true', () => {
        render(
            <CreateTaskModal
                isOpen={true}
                onClose={mockOnClose}
                projects={mockProjects}
                users={[]}
            />
        );

        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByText(/nowe zadanie/i)).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /zapisz|utwórz/i })).toBeInTheDocument();
    });

    it('calls handleSubmit when form is submitted', () => {
        render(
            <CreateTaskModal
                isOpen={true}
                onClose={mockOnClose}
                projects={mockProjects}
                users={[]}
            />
        );

        const submitButton = screen.getByRole('button', { name: /zapisz|utwórz/i });
        fireEvent.click(submitButton);

        expect(mockMutate).toHaveBeenCalledTimes(1);
    });

    it('displays validation errors when errors exist', () => {
        mockHookReturn.errors = { title: 'Tytuł jest wymagany' };

        render(
            <CreateTaskModal
                isOpen={true}
                onClose={mockOnClose}
                projects={mockProjects}
                users={[]}
            />
        );

        expect(screen.getByText('Tytuł jest wymagany')).toBeInTheDocument();
    });
});