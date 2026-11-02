import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../Button';

describe('Button component', () => {
    it('renders children correctly', () => {
        render(<Button>Kliknij mnie</Button>);
        expect(screen.getByRole('button', { name: /kliknij mnie/i })).toBeDefined();
    });

    it('handles click events', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Przycisk</Button>);

        fireEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('shows loading state and disables button when isLoading is true', () => {
        render(<Button isLoading>Zapisz</Button>);

        const button = screen.getByRole('button');
        expect(button.getAttribute('disabled')).not.toBeNull();
        expect(screen.getByText(/ładowanie/i)).toBeDefined();
    });

    it('applies variant and size classes correctly via CVA', () => {
        render(<Button variant="danger" size="lg">Usuń</Button>);

        const button = screen.getByRole('button');
        expect(button.className).toContain('bg-red-600');
        expect(button.className).toContain('px-5 py-3');
    });
});