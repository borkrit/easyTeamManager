declare namespace App {
    namespace Data {
        export type CommentData = {
            id: number;
            body: string;
            user_id: number;
            user: App.Data.UserData | null;
            created_at: undefined | null;
        };
        export type ProjectData = {
            id: number;
            name: string;
            description: string | null;
            users: App.Data.UserData[] | undefined;
            tasks: App.Data.TaskData[] | undefined;
            comments: App.Data.CommentData[] | undefined;
            created_at: undefined | null;
        };
        export type TaskData = {
            id: number;
            title: string;
            description: string | null;
            status: string;
            priority: unknown;
            user_id: number;
            user: App.Data.UserData | null;
            project_id: number | null;
            projectName: string | null;
            assigneeName: string | null;
            comments: App.Data.CommentData[] | undefined;
            created_at: undefined | null;
        };
        export type UserData = {
            id: number;
            name: string;
            email: string;
            role: string | null;
            tasks_count: number | null;
            projects_count: number | null;
            created_at: undefined | null;
        };
    }
}
