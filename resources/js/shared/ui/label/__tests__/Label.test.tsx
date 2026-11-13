import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from '../';

describe('Label Component', () => {
    it('renders text correctly', () => {
        render(<Label>Tytuł zadania</Label>);

        const label = screen.getByText('Tytuł zadania');
        expect(label).toBeInTheDocument();
        expect(label.tagName).toBe('LABEL');
    });

    it('renders required asterisk when required prop is true', () => {
        render(<Label required>E-mail</Label>);

        const label = screen.getByText('E-mail');
        expect(label).toBeInTheDocument();
        
        const asterisk = screen.getByText('*');
        expect(asterisk).toBeInTheDocument();
        expect(asterisk).toHaveClass('text-red-400');
    });

    it('applies custom className correctly', () => {
        render(<Label className="custom-label-class">Nazwa</Label>);

        const label = screen.getByText('Nazwa');
        expect(label).toHaveClass('custom-label-class');
    });
});