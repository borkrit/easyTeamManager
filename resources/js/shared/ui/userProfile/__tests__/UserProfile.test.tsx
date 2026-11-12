import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UserProfile } from '../';

describe('UserProfile Component', () => {
    it('renders user name and email correctly', () => {
        render(<UserProfile name="Jan Kowalski" email="jan.kowalski@easyripok.pl" />);

        expect(screen.getByText('Jan Kowalski')).toBeInTheDocument();
        expect(screen.getByText('jan.kowalski@easyripok.pl')).toBeInTheDocument();
    });

    it('renders the correct uppercase initial as an avatar', () => {
        render(<UserProfile name="adam nowak" email="adam@example.com" />);

        expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('applies custom className correctly', () => {
        render(<UserProfile name="Anna" email="anna@example.com" className="custom-profile-class" />);

        const containerElement = screen.getByText('Anna').closest('.custom-profile-class');
        expect(containerElement).toBeInTheDocument();
    });
});