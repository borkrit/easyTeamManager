export interface ProjectUser {
    id: number;
    name: string;
    email?: string;
}

export interface ProjectData {
    id?: number;
    name: string;
    description?: string | null;
    users?: ProjectUser[];
}

export interface ProjectFormValues {
    name: string;
    description: string;
    user_ids: number[];
}

export type UiProject = {
    id: number;
    name: string;
    description?: string;
    tasks_count?: number;
    users?: { id: number; name: string; email: string }[];
    created_at: string;
};

export interface ProjectTableProps {
    projects: UiProject[];
    selectedIds?: number[];
    onSelectAll?: (checked: boolean) => void;
    onSelectOne?: (id: number) => void;
    onEditProject?: (project: UiProject) => void;
}