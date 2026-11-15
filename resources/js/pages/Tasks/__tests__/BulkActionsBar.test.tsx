import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BulkActionsBar } from '../ui/BulkActionsBar';

describe('BulkActionsBar', () => {
    it('renders nothing when selectedCount is 0', () => {
        const { container } = render(
            <BulkActionsBar
                selectedCount={0}
                bulkAction=""
                onActionChange={vi.fn()}
                onSubmit={vi.fn()}
            />
        );

        expect(container).toBeEmptyDOMElement();
    });

    it('renders selected count, dropdown options, and handles action selection', () => {
        const handleActionChange = vi.fn();
        const handleSubmit = vi.fn();

        render(
            <BulkActionsBar
                selectedCount={3}
                bulkAction=""
                onActionChange={handleActionChange}
                onSubmit={handleSubmit}
            />
        );

        expect(screen.getByText('3')).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'delete' } });
        expect(handleActionChange).toHaveBeenCalledWith('delete');
    });

    it('disables submit button when no action is selected or isLoading is true', () => {
        const { rerender } = render(
            <BulkActionsBar
                selectedCount={2}
                bulkAction=""
                onActionChange={vi.fn()}
                onSubmit={vi.fn()}
                isLoading={false}
            />
        );

        const submitButton = screen.getByRole('button', { name: /Wykonaj/i });
        expect(submitButton).toBeDisabled();

        rerender(
            <BulkActionsBar
                selectedCount={2}
                bulkAction="delete"
                onActionChange={vi.fn()}
                onSubmit={vi.fn()}
                isLoading={true}
            />
        );

        expect(screen.getByRole('button', { name: /Przetwarzanie.../i })).toBeDisabled();
    });

    it('triggers onSubmit callback on form submission', () => {
        const handleSubmit = vi.fn((e) => e.preventDefault());

        render(
            <BulkActionsBar
                selectedCount={1}
                bulkAction="status_zakonczone"
                onActionChange={vi.fn()}
                onSubmit={handleSubmit}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /Wykonaj/i }));
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
});