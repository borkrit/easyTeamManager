export interface PaginatedData<T> {
    data: T[];
    links: { url: string | null; label: string; active: boolean }[];
    from: number | null;
    to: number | null;
    total: number;
}

export interface ProfilePageProps {
    auth?: {
        user?: App.Data.UserData;
    };
    tasks?: PaginatedData<App.Data.TaskData>;
    [key: string]: unknown;
}