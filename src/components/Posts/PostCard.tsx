import type {Post} from "@/types/Post.ts";
import { Link } from "react-router-dom";

type PostCardProps = {
    post: Post
}

export function PostCard({ post }: PostCardProps) {
    return (
        <div className="card h-100">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{post.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">User {post.userId}</h6>
                <p className="card-text">{post.body}</p>
                <Link to={`/posts/${post.id}`} className="btn btn-primary mt-auto">Details</Link>
            </div>
        </div>
    )
}