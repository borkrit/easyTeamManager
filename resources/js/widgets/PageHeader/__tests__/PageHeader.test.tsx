import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PageHeader } from '../PageHeader';

describe('PageHeader widget', () => {
    it('renders title and description correctly', () => {
        render(
            <PageHeader
                title="Zadania"
                description="Zarządzaj swoimi zadaniami i projektami."
            />
        );

        expect(screen.getByRole('heading', { name: /zadania/i })).toBeDefined();
        expect(screen.getByText(/zarządzaj swoimi zadaniami i projektami/i)).toBeDefined();
        expect(screen.queryByRole('button')).toBeNull();
    });

    it('renders action button when actionLabel and onActionClick are provided', () => {
        const handleAction = vi.fn();
        render(
            <PageHeader
                title="Projekty"
                description="Lista wszystkich projektów."
                actionLabel="Nowy projekt"
                onActionClick={handleAction}
            />
        );

        const button = screen.getByRole('button', { name: /nowy projekt/i });
        expect(button).toBeDefined();

        fireEvent.click(button);
        expect(handleAction).toHaveBeenCalledTimes(1);
    });
});