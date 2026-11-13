import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatCard } from '../ui/StatCard';

describe('StatCard', () => {
    it('renders title, value, and icon correctly', () => {
        render(
            <StatCard 
                title="Wszystkie projekty" 
                value={12} 
                icon="📁" 
                colorTheme="indigo" 
            />
        );

        expect(screen.getByText('Wszystkie projekty')).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
        expect(screen.getByText('📁')).toBeInTheDocument();
    });

    it('applies highlight styles when isHighlighted is true', () => {
        render(
            <StatCard 
                title="Ukończone zadania" 
                value={5} 
                icon="✅" 
                colorTheme="emerald" 
                isHighlighted={true} 
            />
        );

        const valueElement = screen.getByText('5');
        expect(valueElement).toHaveClass('text-emerald-400');
    });
});