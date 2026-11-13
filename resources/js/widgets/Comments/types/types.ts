
type Comment = App.Data.CommentData;

export interface CommentsProps {
    comments: Comment[];
    commentableType: 'task' | 'project';
    commentableId: number;
}
