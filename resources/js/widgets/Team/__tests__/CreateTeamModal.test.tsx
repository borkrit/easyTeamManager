import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CreateTeamModal } from '../CreateTeamModal';

describe('CreateTeamModal', () => {
    const mockForm = {
        data: { name: '', email: '', password: '', role: 'developer' },
        setData: vi.fn(),
        processing: false,
        errors: {},
    } as any;

    const mockOnSubmit = vi.fn((e) => e.preventDefault());
    const mockOnClose = vi.fn();

    it('renders nothing when isOpen is false', () => {
        const { container } = render(
            <CreateTeamModal
                isOpen={false}
                onClose={mockOnClose}
                form={mockForm}
                onSubmit={mockOnSubmit}
            />
        );
        expect(container).toBeEmptyDOMElement();
    });

    it('renders modal with title when isOpen is true', () => {
        render(
            <CreateTeamModal
                isOpen={true}
                onClose={mockOnClose}
                form={mockForm}
                onSubmit={mockOnSubmit}
                team={null}
            />
        );
        expect(screen.getByText('Dodaj nowego członka zespołu')).toBeInTheDocument();
    });

    it('renders edit title when team is provided', () => {
        render(
            <CreateTeamModal
                isOpen={true}
                onClose={mockOnClose}
                form={mockForm}
                onSubmit={mockOnSubmit}
                team={{ id: 1, name: 'Jan Kowalski', email: 'jan@example.com', role: 'admin' } as any}
            />
        );
        expect(screen.getByText('Edytuj członka zespołu')).toBeInTheDocument();
    });
});