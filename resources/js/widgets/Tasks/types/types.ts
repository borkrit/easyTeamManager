export interface GetTaskFormFieldsParams {
    projectId?: number | string;
    projects: { id: number; name: string }[];
    availableUsers: { id: number; name: string }[];
    hasNoUsers: boolean;
}
export type UiTask = App.Data.TaskData;

export interface BaseTaskTableProps {
    tasks: { data: UiTask[]; [key: string]: any };
    onEditTask?: (task: UiTask) => void;
}

interface DefaultTaskTableProps extends BaseTaskTableProps {
    selectable?: true;
    selectedTaskIds: number[];
    toggleSelectAll: (checked: boolean) => void;
    toggleTaskSelection: (id: number) => void;
}

interface DisabledSelectionTaskTableProps extends BaseTaskTableProps {
    selectable: false;
    selectedTaskIds?: never;
    toggleSelectAll?: never;
    toggleTaskSelection?: never;
}

export type TaskTableProps = DefaultTaskTableProps | DisabledSelectionTaskTableProps;

export interface User {
    id: number;
    name: string;
}

export interface Project {
    id: number;
    name: string;
    users?: User[];
}

export interface CreateTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId?: number;
    users: User[];
    projects?: Project[];
    task?: UiTask | null;
    initialData?: UiTask | null;
}

export interface TaskFormValues {
    project_id: number | '';
    title: string;
    description: string;
    user_id: number | '';
    status: string;
    priority: 'niski' | 'sredni' | 'wysoki';
}