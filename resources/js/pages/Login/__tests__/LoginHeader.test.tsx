import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LoginHeader } from '../ui/LoginHeader';

describe('LoginHeader', () => {
    it('renders application logo icon, title, and subtitle correctly', () => {
        render(<LoginHeader />);

        expect(screen.getByText('⚡')).toBeInTheDocument();
        expect(screen.getByText('EasyTask')).toBeInTheDocument();
        expect(screen.getByText('Zaloguj się do systemu zarządzania zadaniami')).toBeInTheDocument();
    });
});