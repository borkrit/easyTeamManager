import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ModalFormWrapper } from '../ModalFormWrapper';

describe('ModalFormWrapper Component', () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        onSubmit: vi.fn((e) => e.preventDefault()),
        title: 'Testowy Modal',
        children: <div data-testid="modal-content">Zawartość formularza</div>,
    };

    it('does not render when isOpen is false', () => {
        render(<ModalFormWrapper {...defaultProps} isOpen={false} />);
        
        expect(screen.queryByText('Testowy Modal')).not.toBeInTheDocument();
    });

    it('renders correctly when isOpen is true with title and children', () => {
        render(<ModalFormWrapper {...defaultProps} />);

        expect(screen.getByText('Testowy Modal')).toBeInTheDocument();
        expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    });

    it('calls onClose when close button or cancel button is clicked', () => {
        const handleClose = vi.fn();
        render(<ModalFormWrapper {...defaultProps} onClose={handleClose} />);

        const cancelButton = screen.getByRole('button', { name: /anuluj/i });
        fireEvent.click(cancelButton);

        expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onSubmit when the form is submitted', () => {
        const handleSubmit = vi.fn((e) => e.preventDefault());
        render(<ModalFormWrapper {...defaultProps} onSubmit={handleSubmit} />);

        const submitButton = screen.getByRole('button', { name: /utwórz/i });
        fireEvent.click(submitButton);

        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('shows loading state on submit button when processing is true', () => {
        render(<ModalFormWrapper {...defaultProps} processing={true} />);

        const submitButton = screen.getByRole('button', { name: /ładowanie/i });
        expect(submitButton).toBeDisabled();
    });
});