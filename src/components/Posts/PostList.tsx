import {PostCard} from "./PostCard.tsx";
import type {Post} from "../../models/Post.ts";

type PostListProps = {
    posts: Post[];
}

export function PostList({ posts }: PostListProps) {
    if (posts.length === 0) return <div className="text-center">Empty</div>;

    return (
        <div className="posts">
            <div className="row g-3">
                {posts.map((post) => (
                    <div key={`${post.id}-postId`} className="col-3">
                        <PostCard post={post}/>
                    </div>
                ))}
            </div>
        </div>
    )
}