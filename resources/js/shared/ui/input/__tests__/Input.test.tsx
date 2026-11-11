import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from '../';

describe('Input Component', () => {
    it('renders correctly with default props', () => {
        render(<Input placeholder="Wprowadź tekst" />);
        
        const input = screen.getByPlaceholderText('Wprowadź tekst');
        expect(input).toBeInTheDocument();
        expect(input).toHaveClass('bg-slate-950');
    });

    it('handles value changes', () => {
        const handleChange = vi.fn();
        render(<Input onChange={handleChange} placeholder="Test" />);

        const input = screen.getByPlaceholderText('Test');
        fireEvent.change(input, { target: { value: 'Nowa wartość' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('applies error styles when hasError is true', () => {
        render(<Input hasError placeholder="Błąd" />);

        const input = screen.getByPlaceholderText('Błąd');
        expect(input).toHaveClass('border-red-500');
    });

    it('can be disabled', () => {
        render(<Input disabled placeholder="Zablokowany" />);

        const input = screen.getByPlaceholderText('Zablokowany');
        expect(input).toBeDisabled();
        expect(input).toHaveClass('disabled:opacity-50');
    });
});