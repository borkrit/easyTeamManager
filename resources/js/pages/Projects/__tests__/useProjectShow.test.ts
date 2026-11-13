import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useProjectShow } from '../hooks/useProjectShow';
import { useDeleteResource } from '@/shared/hooks/useDeleteResource';

vi.mock('@/shared/hooks/useDeleteResource', () => ({
    useDeleteResource: vi.fn(),
}));

const mockedUseDeleteResource = vi.mocked(useDeleteResource);

describe('useProjectShow Hook', () => {
    const mockProject: App.Data.ProjectData = {
        id: 42,
        name: 'Test Project',
        description: 'Description',
        tasks: [],
        users: [],
        comments: [],
        created_at: null,
    } as App.Data.ProjectData;

    it('initializes with closed edit modal', () => {
        mockedUseDeleteResource.mockReturnValue({ deleteItem: vi.fn() });

        const { result } = renderHook(() => useProjectShow(mockProject));

        expect(result.current.isEditModalOpen).toBe(false);
    });

    it('opens and closes edit modal correctly', () => {
        mockedUseDeleteResource.mockReturnValue({ deleteItem: vi.fn() });

        const { result } = renderHook(() => useProjectShow(mockProject));

        act(() => {
            result.current.handleEditClick();
        });

        expect(result.current.isEditModalOpen).toBe(true);

        act(() => {
            result.current.closeEditModal();
        });

        expect(result.current.isEditModalOpen).toBe(false);
    });

    it('triggers deleteItem with correct project id and name on delete call', () => {
        const mockDelete = vi.fn();
        mockedUseDeleteResource.mockReturnValue({ deleteItem: mockDelete });

        const { result } = renderHook(() => useProjectShow(mockProject));

        act(() => {
            result.current.handleDeleteClick();
        });

        expect(mockDelete).toHaveBeenCalledTimes(1);
        expect(mockDelete).toHaveBeenCalledWith(42, 'Test Project');
    });
});