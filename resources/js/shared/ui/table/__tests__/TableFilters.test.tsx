import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TableFilters } from '../TableFilter';

// Мокаем компонент Button, чтобы тест не зависел от его внутренней реализации
vi.mock('../button', () => ({
    Button: ({ children, onClick, ...props }: any) => (
        <button onClick={onClick} {...props}>
            {children}
        </button>
    ),
}));

describe('TableFilters component', () => {
    const mockFields = [
        {
            name: 'search',
            label: 'Szukaj',
            type: 'text' as const,
            placeholder: 'Wpisz nazwę...',
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select' as const,
            options: [
                { value: 'active', label: 'Aktywny' },
                { value: 'inactive', label: 'Nieакtywny' },
            ],
        },
    ];

    const mockValues = {
        search: 'Projekt',
        status: 'active',
    };

    it('renders text and select filter fields correctly', () => {
        render(
            <TableFilters
                fields={mockFields}
                values={mockValues}
                onChange={() => {}}
                onReset={() => {}}
            />
        );

        expect(screen.getByText('Szukaj')).toBeDefined();
        expect(screen.getByText('Status')).toBeDefined();

        const input = screen.getByPlaceholderText('Wpisz nazwę...');
        expect((input as HTMLInputElement).value).toBe('Projekt');

        const select = screen.getByRole('combobox');
        expect((select as HTMLSelectElement).value).toBe('active');
    });

    it('triggers onChange when input value changes', () => {
        const handleChange = vi.fn();
        render(
            <TableFilters
                fields={mockFields}
                values={mockValues}
                onChange={handleChange}
                onReset={() => {}}
            />
        );

        const input = screen.getByPlaceholderText('Wpisz nazwę...');
        fireEvent.change(input, { target: { value: 'Nowy projekt' } });

        expect(handleChange).toHaveBeenCalledWith('search', 'Nowy projekt');
    });

    it('triggers onReset when reset button is clicked', () => {
        const handleReset = vi.fn();
        render(
            <TableFilters
                fields={mockFields}
                values={mockValues}
                onChange={() => {}}
                onReset={handleReset}
            />
        );

        const resetButton = screen.getByRole('button', { name: /resetuj/i });
        fireEvent.click(resetButton);

        expect(handleReset).toHaveBeenCalledTimes(1);
    });
});