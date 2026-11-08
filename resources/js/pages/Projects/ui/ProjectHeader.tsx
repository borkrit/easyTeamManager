import { Button } from '@/shared/ui/button';

interface ProjectHeaderProps {
    name: string;
    description?: string | null;
    onEdit: () => void;
    onDelete: () => void;
}

export const ProjectHeader = ({ name, description, onEdit, onDelete }: ProjectHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-100">{name}</h2>
                <p className="text-sm text-slate-400 mt-1">
                    {description || 'Brak opisu projektu.'}
                </p>
            </div>
            
            <div className="flex items-center gap-3">
                <Button variant="secondary" size="md" onClick={onEdit}>
                    Edytuj projekt
                </Button>
                <Button variant="danger" size="md" onClick={onDelete}>
                    Usuń projekt
                </Button>
            </div>
        </div>
    );
};