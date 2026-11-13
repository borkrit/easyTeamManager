

export const TASK_STATUS_CONFIG: Record<App.Enums.TaskStatus, { label: string; variant: string }> = {
    do_zrobienia: { label: 'Do zrobienia', variant: 'slate' },
    w_trakcie: { label: 'W trakcie', variant: 'indigo' },
    zakonczone: { label: 'Zakończone', variant: 'emerald' },
};

export const TASK_PRIORITY_CONFIG: Record<App.Enums.TaskPriority, { label: string; variant: string }> = {
    niski: { label: 'Niski', variant: 'slate' },
    sredni: { label: 'Średni', variant: 'amber' },
    wysoki: { label: 'Wysoki', variant: 'red' },
};

export const TASK_STATUS_OPTIONS = Object.entries(TASK_STATUS_CONFIG).map(([value, { label }]) => ({
    value: value as App.Enums.TaskStatus,
    label,
}));

export const TASK_PRIORITY_OPTIONS = Object.entries(TASK_PRIORITY_CONFIG).map(([value, { label }]) => ({
    value: value as App.Enums.TaskPriority,
    label,
}));