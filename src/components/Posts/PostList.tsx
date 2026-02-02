import {PostCard} from "./PostCard.tsx";
import type {Post} from "@/models/Post.ts";
import type {UseQueryResult} from "@/types/UseQueryResult.ts";

type PostListProps = {
    postsResponse: UseQueryResult<Post[]>;
}

export function PostList({ postsResponse }: PostListProps) {
    const { data: posts, isLoading, error  } = postsResponse;

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center m-5" role="alert">
                {error.message}
            </div>
        );
    }

    if (!posts.length) {
        return <div className="text-center">Empty</div>
    }

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