import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TeamProfileHeader } from '../ui/TeamProfileHeader';

describe('TeamProfileHeader', () => {
    it('renders user name, email, role badge and initials correctly', () => {
        render(
            <TeamProfileHeader
                name="Jan Kowalski"
                email="jan.kowalski@example.com"
                role="developer"
            />
        );

        expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
        expect(screen.getByText('jan.kowalski@example.com')).toBeInTheDocument();
        expect(screen.getByText('DEVELOPER')).toBeInTheDocument();
        expect(screen.getByText('JA')).toBeInTheDocument();
    });
});