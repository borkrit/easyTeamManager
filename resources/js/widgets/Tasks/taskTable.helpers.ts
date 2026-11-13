import { TASK_STATUS_CONFIG, TASK_PRIORITY_CONFIG } from '@/shared/config/task.constants';

const statusBadgeStyles: Record<string, string> = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    slate: 'bg-slate-800 text-slate-400 border border-slate-700',
};

const priorityTextStyles: Record<string, string> = {
    red: 'text-red-400',
    amber: 'text-amber-400',
    slate: 'text-slate-400',
};

export const getTaskStatusInfo = (status?: string) => {
    const config = status ? TASK_STATUS_CONFIG[status as keyof typeof TASK_STATUS_CONFIG] : null;
    return {
        label: config ? config.label : status || '—',
        className: config ? statusBadgeStyles[config.variant] : statusBadgeStyles.slate,
    };
};

export const getTaskPriorityInfo = (priority?: string) => {
    const config = priority ? TASK_PRIORITY_CONFIG[priority as keyof typeof TASK_PRIORITY_CONFIG] : null;
    return {
        label: config ? config.label : priority ? String(priority) : '—',
        className: config ? priorityTextStyles[config.variant] : priorityTextStyles.slate,
    };
};