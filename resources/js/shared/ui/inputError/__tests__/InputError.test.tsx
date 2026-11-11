import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InputError } from '../';

describe('InputError Component', () => {
    it('does not render anything when message is missing or empty', () => {
        const { container } = render(<InputError />);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders error message when provided', () => {
        render(<InputError message="To pole jest wymagane" />);

        const errorElement = screen.getByText('To pole jest wymagane');
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveClass('text-red-400', 'text-xs');
    });

    it('applies custom className correctly', () => {
        render(<InputError message="Błąd" className="custom-class" />);

        const errorElement = screen.getByText('Błąd');
        expect(errorElement).toHaveClass('custom-class');
    });
});