import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from '../Pagination';

vi.mock('@inertiajs/react', () => ({
    Link: ({ href, children, dangerouslySetInnerHTML, className, ...props }: any) => {
        if (dangerouslySetInnerHTML) {
            return (
                <a
                    href={href}
                    className={className}
                    dangerouslySetInnerHTML={dangerouslySetInnerHTML}
                    {...props}
                />
            );
        }
        return (
            <a href={href} className={className} {...props}>
                {children}
            </a>
        );
    },
}));

describe('Pagination component', () => {
    const mockLinks = [
        { url: null, label: '&laquo; Poprzednia', active: false },
        { url: '/tasks?page=1', label: '1', active: true },
        { url: '/tasks?page=2', label: '2', active: false },
        { url: '/tasks?page=2', label: 'Następna &raquo;', active: false },
    ];

    it('renders pagination links and active states correctly', () => {
        render(<Pagination links={mockLinks} />);

        const activeLink = screen.getByRole('link', { name: '1' });
        expect(activeLink.className).toContain('bg-indigo-600');
    });

    it('renders disabled state via CVA correctly', () => {
        render(<Pagination links={mockLinks} />);

        const disabledSpan = screen.getByText((content, element) => {
            return element?.tagName.toLowerCase() === 'span' && content.includes('Poprzednia');
        });

        expect(disabledSpan.className).toContain('cursor-not-allowed');
    });
});