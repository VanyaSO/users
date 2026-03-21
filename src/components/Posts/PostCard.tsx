import type {Post} from "@/types/posts/Post.ts";
import {Link} from "react-router";
import {Button, Card} from "react-bootstrap";
import {getPostDetailsPath, getPostUpdatePath} from "@/routes/routerConfig.ts";

type PostCardProps = {
    post: Post
}

export function PostCard({post}: PostCardProps) {
    const { id, title, userId, body } = post;

    return (
        <Card className="h-100">
            <Card.Body className="d-flex flex-column">
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    User {userId}
                </Card.Subtitle>
                <Card.Text>{body}</Card.Text>

                <div className="d-flex mt-auto gap-2">
                    <Link to={getPostDetailsPath(id)}>
                        <Button variant="primary">
                            Details
                        </Button>
                    </Link>
                    <Link to={getPostUpdatePath(id)} className="mt-auto">
                        <Button variant="warning">
                            Edit
                        </Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>
    )
}