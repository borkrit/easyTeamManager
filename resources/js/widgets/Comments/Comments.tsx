import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea'; 
import { useComments } from './hooks/useComments';
import { CommentsProps } from './types/types';
import { InputError } from '@/shared/ui/inputError';

export function Comments({ comments, commentableType, commentableId }: CommentsProps) {
    const { data, setData, handleSubmit, processing, errors } = useComments({
        commentableType,
        commentableId,
    });

    return (
        <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-slate-200">Komentarze</h3>

            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {comments && comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-indigo-400">{comment.user?.name ?? 'Użytkownik'}</span>
                                <span className="text-slate-500 text-xs">
                                    {comment.created_at ? new Date(comment.created_at).toLocaleString('pl-PL') : ''}
                                </span>
                            </div>
                            <p className="text-slate-300">{comment.body}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-xs text-slate-500 italic">Brak komentarzy.</p>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
                <Textarea
                    value={data.body}
                    onChange={(e) => setData('body', e.target.value)}
                    placeholder="Napisz komentarz..."
                    rows={2}
                    hasError={Boolean(errors.body)}
                    required
                />
                {errors.body && <InputError message={errors.body}/>}
                
                <div className="flex justify-end">
                    <Button variant="primary" size="sm" disabled={processing} isLoading={processing}>
                        Dodaj komentarz
                    </Button>
                </div>
            </form>
        </div>
    );
}