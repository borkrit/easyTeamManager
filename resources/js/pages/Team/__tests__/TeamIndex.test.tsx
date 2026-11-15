// resources/js/pages/Team/__tests__/TeamIndex.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TeamIndex from '../Index';
import { useTeamIndex } from '../hooks/useTeamIndex';

vi.mock('@inertiajs/react', () => ({
    Head: ({ title }: { title: string }) => <title>{title}</title>,
}));

vi.mock('../hooks/useTeamIndex', () => ({
    useTeamIndex: vi.fn(),
}));

vi.mock('@/widgets', () => ({
    PageHeader: ({ onActionClick }: { onActionClick: () => void }) => (
        <button onClick={onActionClick}>+ Dodaj osobę</button>
    ),
    TeamTable: () => <div data-testid="team-table">Table Mock</div>,
    CreateTeamModal: ({ isOpen }: { isOpen: boolean }) =>
        isOpen ? <div data-testid="team-modal">Modal Open</div> : null,
}));

const mockedUseTeamIndex = vi.mocked(useTeamIndex);

describe('TeamIndex Page', () => {
    it('renders team table and opens modal when action button is clicked', () => {
        const mockOpenModal = vi.fn();

        mockedUseTeamIndex.mockReturnValue({
            isModalOpen: false,
            form: {} as unknown as ReturnType<typeof useTeamIndex>['form'],
            handleSubmit: vi.fn(),
            handleOpenModal: mockOpenModal,
            handleCloseModal: vi.fn(),
        });

        render(<TeamIndex members={[]} />);

        expect(screen.getByTestId('team-table')).toBeInTheDocument();
        expect(screen.queryByTestId('team-modal')).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /\+ Dodaj osobę/i }));
        expect(mockOpenModal).toHaveBeenCalledTimes(1);
    });
});