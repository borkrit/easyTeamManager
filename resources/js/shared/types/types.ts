
export type HttpMethod = 'post' | 'put' | 'patch' | 'delete';

export interface MutationOptions {
    onSuccess?: () => void;
    onError?: (errors: Record<string, any>) => void;
    preserveScroll?: boolean;
    preserveState?: boolean;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export type FilterValues = Record<string, any>;

export type ResourceType = 'projects' | 'team' | 'tasks';

export interface UseDeleteOptions {
    confirmMessage?: string;
    onSuccess?: () => void;
}

export interface ProjectOption {
    id: number;
    name: string;
}

export interface TaskFilterOptions {
    [key: string]: any;
}