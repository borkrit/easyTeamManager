import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useTeamIndex } from '../hooks/useTeamIndex';
import { useTeamForm } from '@/widgets';

vi.mock('@/widgets', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@/widgets')>();
    return {
        ...actual,
        useTeamForm: vi.fn(),
    };
});

const mockedUseTeamForm = vi.mocked(useTeamForm);

describe('useTeamIndex Hook', () => {
    it('manages modal open state and exposes form utilities correctly', () => {
        const mockForm = { data: {}, setData: vi.fn() };
        const mockSubmit = vi.fn();
        const mockSetModalOpen = vi.fn();

        mockedUseTeamForm.mockReturnValue({
            isModalOpen: false,
            setIsModalOpen: mockSetModalOpen,
            form: mockForm as unknown as ReturnType<typeof useTeamForm>['form'],
            handleSubmit: mockSubmit,
        });

        const { result } = renderHook(() => useTeamIndex());

        expect(result.current.isModalOpen).toBe(false);

        act(() => {
            result.current.handleOpenModal();
        });
        expect(mockSetModalOpen).toHaveBeenCalledWith(true);

        act(() => {
            result.current.handleCloseModal();
        });
        expect(mockSetModalOpen).toHaveBeenCalledWith(false);
    });
});