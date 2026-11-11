import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from '../';

describe('Textarea Component', () => {
    it('renders correctly with placeholder and default rows', () => {
        render(<Textarea placeholder="Wpisz opis..." />);

        const textarea = screen.getByPlaceholderText('Wpisz opis...');
        expect(textarea).toBeInTheDocument();
        expect(textarea.tagName).toBe('TEXTAREA');
        expect(textarea).toHaveAttribute('rows', '3'); // стандартное значение по умолчанию, если задано
    });

    it('handles value changes correctly', () => {
        const handleChange = vi.fn();
        render(<Textarea onChange={handleChange} placeholder="Test" />);

        const textarea = screen.getByPlaceholderText('Test');
        fireEvent.change(textarea, { target: { value: 'Nowy wieloliniowy tekst' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('applies error styles and attributes when hasError is true', () => {
        render(<Textarea hasError placeholder="Błąd" />);

        const textarea = screen.getByPlaceholderText('Błąd');
        expect(textarea).toHaveClass('border-red-500');
    });

    it('can be disabled', () => {
        render(<Textarea disabled placeholder="Zablokowane" />);

        const textarea = screen.getByPlaceholderText('Zablokowane');
        expect(textarea).toBeDisabled();
        expect(textarea).toHaveClass('disabled:opacity-50');
    });
});