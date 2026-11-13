import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectHeader } from '../ui/ProjectHeader';

describe('ProjectHeader', () => {
    it('renders project name and description correctly', () => {
        const handleEdit = vi.fn();
        const handleDelete = vi.fn();

        render(
            <ProjectHeader
                name="Test Project"
                description="This is a test description"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        );

        expect(screen.getByText('Test Project')).toBeInTheDocument();
        expect(screen.getByText('This is a test description')).toBeInTheDocument();
    });

    it('renders fallback description when description is missing or null', () => {
        render(
            <ProjectHeader
                name="Test Project"
                description={null}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
            />
        );

        expect(screen.getByText('Brak opisu projektu.')).toBeInTheDocument();
    });

    it('triggers onEdit and onDelete callbacks when buttons are clicked', () => {
        const handleEdit = vi.fn();
        const handleDelete = vi.fn();

        render(
            <ProjectHeader
                name="Test Project"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /Edytuj projekt/i }));
        expect(handleEdit).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByRole('button', { name: /Usuń projekt/i }));
        expect(handleDelete).toHaveBeenCalledTimes(1);
    });
});