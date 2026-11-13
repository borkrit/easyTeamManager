

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    links: PaginationLink[];
    from: number | null;
    to: number | null;
    total: number;
}

export interface TasksIndexProps {
    tasks: PaginatedData<App.Data.TaskData>;
    users: App.Data.UserData[];
    projects?: App.Data.ProjectData[];
    filters: {
        status?: string;
        project_id?: string;
        search?: string;
        priority?: string;
    };
}

export interface TaskShowProps {
    task: App.Data.TaskData;
    allProjects?: Array<{ id: number; name: string }>; 
    allUsers?: Array<{ id: number; name: string }>;   
}