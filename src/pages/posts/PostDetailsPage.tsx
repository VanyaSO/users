import {usePost} from "@/hooks/posts/usePost.ts";
import {useNavigate, useParams} from "react-router-dom";

export const PostDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: post, isLoading, error } = usePost(id);

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

    if (!post) {
        return (
            <div className="alert alert-danger text-center m-5" role="alert">
                Not Found
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-primary">{post.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Post {post.id} - user {post.userId} </h6>
                            <p className="card-text mt-4">{post.body}</p>
                            <button onClick={() => navigate(-1)} className="btn btn-primary mt-auto">Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}