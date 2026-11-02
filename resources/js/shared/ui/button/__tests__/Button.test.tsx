import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '../Badge';

describe('Badge component', () => {
    it('renders with label prop correctly', () => {
        render(<Badge label="W trakcie" />);
        expect(screen.getByText('W trakcie')).toBeDefined();
    });

    it('renders with children correctly', () => {
        render(<Badge>Nowe zadanie</Badge>);
        expect(screen.getByText('Nowe zadanie')).toBeDefined();
    });

    it('applies variant classes correctly', () => {
        const { container } = render(<Badge variant="wysoki" label="Wysoki" />);
        const badge = container.firstElementChild;
        expect(badge?.className).toContain('text-rose-400');
    });

    it('applies custom className and passes HTML attributes', () => {
        const { container } = render(<Badge data-testid="custom-badge" className="custom-class" label="Test" />);
        const badge = container.firstElementChild;
        
        expect(badge?.className).toContain('custom-class');
        expect(screen.getByTestId('custom-badge')).toBeDefined();
    });
});