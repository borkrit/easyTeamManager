import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from '../';

describe('Select Component', () => {
    const mockOptions = [
        { value: 'do_zrobienia', label: 'Do zrobienia' },
        { value: 'w_trakcie', label: 'W trakcie' },
        { value: 'zakonczone', label: 'Zakończone' },
    ];

    it('renders correctly with options and placeholder', () => {
        render(<Select options={mockOptions} placeholder="Wybierz status..." />);
        
        const placeholderOption = screen.getByText('Wybierz status...') as HTMLOptionElement;
        expect(placeholderOption).toBeInTheDocument();
        expect(placeholderOption.disabled).toBe(true);

        expect(screen.getByText('Do zrobienia')).toBeInTheDocument();
        expect(screen.getByText('W trakcie')).toBeInTheDocument();
        expect(screen.getByText('Zakończone')).toBeInTheDocument();
    });

    it('handles value changes properly', () => {
        const handleChange = vi.fn();
        render(<Select options={mockOptions} onChange={handleChange} />);
        
        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'w_trakcie' } });
        
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('applies error variant styles when hasError is true', () => {
        render(<Select options={mockOptions} hasError={true} />);
        const select = screen.getByRole('combobox');
        
        expect(select).toHaveClass('border-red-500');
    });

    it('merges custom className properly', () => {
        render(<Select options={mockOptions} className="custom-test-class" />);
        const select = screen.getByRole('combobox');
        
        expect(select).toHaveClass('custom-test-class');
        expect(select).toHaveClass('bg-slate-950');
    });

    it('respects disabled state', () => {
        render(<Select options={mockOptions} disabled />);
        const select = screen.getByRole('combobox');
        
        expect(select).toBeDisabled();
    });
});