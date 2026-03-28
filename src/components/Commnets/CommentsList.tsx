import type {Comment as CommentType} from "@t/Comment.ts";
import {CommentItem} from "./CommentItem.tsx";

type CommentListProps = {
    className?: string;
    comments: CommentType[];
}

export const CommentsList = ({className, comments}: CommentListProps) => {
    return (
        <div className={className}>
            {comments.map((comment: CommentType) => (
                <CommentItem key={comment.id} comment={comment}/>
            ))}
        </div>
    );
};