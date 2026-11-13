export interface TaskFilterValues {
    search?: string;
    status?: string;
    priority?: string;
    user_id?: string;
    project_id?: string;
}

export interface FilterOption {
    id: number | string;
    name: string;
}

export interface TaskFiltersProps {
    filters: TaskFilterValues;
    users: FilterOption[];
    projects: FilterOption[];
}