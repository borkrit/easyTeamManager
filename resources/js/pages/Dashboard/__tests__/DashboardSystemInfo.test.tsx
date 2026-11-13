import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DashboardSystemInfo } from '../ui/DashboardSystemInfo';

describe('DashboardSystemInfo', () => {
    it('renders system information and architecture details', () => {
        render(<DashboardSystemInfo />);

        expect(screen.getByText('Informacje o systemie')).toBeInTheDocument();
        expect(screen.getByText('Feature-Sliced Design')).toBeInTheDocument();
        expect(
            screen.getByText('Laravel, Inertia.js, React oraz Tailwind CSS')
        ).toBeInTheDocument();
    });

    it('renders current application version', () => {
        render(<DashboardSystemInfo />);

        expect(screen.getByText('Wersja aplikacji:')).toBeInTheDocument();
        expect(screen.getByText('1.0.0-rc')).toBeInTheDocument();
    });
});