import type {Post} from "@t/post.ts";
import {Col, Row} from "react-bootstrap";
import {PostCard} from "@components/Posts/PostCard";
import cn from "classnames";

type PostListProps = {
    className?: string;
    posts: Post[];
}

export const PostList = ({className, posts }: PostListProps) => {
    return (
        <Row className={cn(className, "g-3")}>
            {posts.map(post => (
                <Col sm={3} key={post.id}>
                    <PostCard post={post}/>
                </Col>
            ))}
        </Row>
    )
}