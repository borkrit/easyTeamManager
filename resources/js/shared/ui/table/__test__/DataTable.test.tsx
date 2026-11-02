import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DataTable, Column } from '../DataTable';

interface TestItem {
    id: number;
    name: string;
    status: string;
}

describe('DataTable component', () => {
    const mockData: TestItem[] = [
        { id: 1, name: 'Projekt Alfa', status: 'W trakcie' },
        { id: 2, name: 'Projekt Beta', status: 'Zakończone' },
    ];

    const mockColumns: Column<TestItem>[] = [
        { header: 'Nazwa', accessor: 'name' },
        { header: 'Status', accessor: (item) => <span data-testid={`status-${item.id}`}>{item.status}</span> },
    ];

    it('renders table headers and data correctly', () => {
        render(<DataTable data={mockData} columns={mockColumns} />);

        expect(screen.getByText('Nazwa')).toBeDefined();
        expect(screen.getByText('Status')).toBeDefined();
        expect(screen.getByText('Projekt Alfa')).toBeDefined();
        expect(screen.getByText('Projekt Beta')).toBeDefined();
        expect(screen.getByTestId('status-1').textContent).toBe('W trakcie');
    });

    it('renders empty text when data array is empty', () => {
        render(<DataTable data={[]} columns={mockColumns} emptyText="Brak wyników" />);

        expect(screen.getByText('Brak wyników')).toBeDefined();
    });

    it('handles row selection via checkboxes correctly', () => {
        const handleSelectOne = vi.fn();
        const handleSelectAll = vi.fn();

        render(
            <DataTable
                data={mockData}
                columns={mockColumns}
                selectable={true}
                selectedIds={[1]}
                onSelectOne={handleSelectOne}
                onSelectAll={handleSelectAll}
            />
        );

        const checkboxes = screen.getAllByRole('checkbox');
        // Первый чекбокс — "Выбрать все", остальные — для строк
        expect(checkboxes.length).toBe(3);

        // Кликаем по чекбоксу первой строки
        fireEvent.click(checkboxes[1]);
        expect(handleSelectOne).toHaveBeenCalledWith(1);
    });
});