import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/shared/ui/button';

type Comment = App.Data.CommentData

interface CommentsProps {
    comments: Comment[];
    commentableType: 'task' | 'project';
    commentableId: number;
}

export function Comments({ comments, commentableType, commentableId }: CommentsProps) {
    const { data, setData, post, processing, reset, errors } = useForm({
        body: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/${commentableType}s/${commentableId}/comments`, {
            onSuccess: () => reset('body'),
        });
    };

    return (
        <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-slate-200">Komentarze</h3>

            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {comments && comments.length > 0 ? (
                    comments?.map((comment) => (
                        <div key={comment.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-indigo-400">{comment.user?.name ?? 'Użytkownik'}</span>
                                <span className="text-slate-500">{new Date(comment.created_at).toLocaleString('pl-PL')}</span>
                            </div>
                            <p className="text-slate-300">{comment.body}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-xs text-slate-500 italic">Brak komentarzy.</p>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
                <textarea
                    value={data.body}
                    onChange={(e) => setData('body', e.target.value)}
                    placeholder="Napisz komentarz..."
                    rows={2}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
                    required
                />
                {errors.body && <p className="text-xs text-red-400">{errors.body}</p>}
                
                <div className="flex justify-end">
                    <Button variant="primary" size="sm" disabled={processing} isLoading={processing}>
                        Dodaj komentarz
                    </Button>
                </div>
            </form>
        </div>
    );
}