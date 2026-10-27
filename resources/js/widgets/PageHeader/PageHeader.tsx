import { Button } from '@/shared/ui/button';

interface PageHeaderProps {
    title: string;
    description: string;
    actionLabel?: string;
    onActionClick?: () => void;
}

export function PageHeader({ title, description, actionLabel, onActionClick }: PageHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
                <p className="text-sm text-slate-400 mt-1">{description}</p>
            </div>
            {actionLabel && onActionClick && (
                <Button variant="primary" size="md" onClick={onActionClick}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}