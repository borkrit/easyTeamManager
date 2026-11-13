import { UiProject } from "@/widgets";

export  interface ProjectsIndexProps {
    projects: UiProject[];
    users?: { id: number; name: string }[];
}

export interface ShowProps {
    project: App.Data.ProjectData;
    allUsers: { id: number; name: string }[];
}

export interface ProjectHeaderProps {
    name: string;
    description?: string | null;
    onEdit: () => void;
    onDelete: () => void;
}

export interface ProjectTasksListProps {
    tasks?: Array<{ id: number; title: string; status: string }>;
}

export interface ProjectTeamListProps {
    users?: Array<{ id: number; name: string }>;
}