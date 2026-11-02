import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BackButton } from '../BackButton';

vi.mock('@inertiajs/react', () => ({
    Link: ({ href, children, className, ...props }: any) => (
        <a href={href} className={className} {...props}>
            {children}
        </a>
    ),
}));

describe('BackButton component', () => {
    it('renders with default children text "Wróć do listy"', () => {
        render(<BackButton href="/tasks" />);
        
        const link = screen.getByRole('link', { name: /wróć do listy/i });
        expect(link).toBeDefined();
        expect(link.getAttribute('href')).toBe('/tasks');
    });

    it('renders with custom children text when provided', () => {
        render(<BackButton href="/projects">Powrót do projektu</BackButton>);
        
        expect(screen.getByText('Powrót do projektu')).toBeDefined();
    });

    it('applies wrapperClassName correctly', () => {
        const { container } = render(<BackButton href="/tasks" wrapperClassName="custom-wrapper" />);
        
        const wrapper = container.firstElementChild;
        expect(wrapper?.className).toContain('custom-wrapper');
    });
});