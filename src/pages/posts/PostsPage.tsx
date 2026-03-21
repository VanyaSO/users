import {Link, useSearchParams} from "react-router";
import {Container, Row, Col, Button} from "react-bootstrap";
import { PostsSearchBar } from "@/components/Posts/PostsSearchBar.tsx";
import routerConfig from "@/routes/routerConfig.ts";
import {useGetPostsQuery} from "@/store/postsApi";
import {QueryBoundary} from "@/components/ui/QueryBoundary.tsx";
import {PostCard} from "@/components/Posts/PostCard.tsx";
import type {Post} from "@/types/posts/Post.ts";
import type {PostsParams} from "@/store/postsApi/types.ts";
import {useState} from "react";

export const PostsPage = () => {
    const [searchParams] = useSearchParams();
    const [params, setParams] = useState<PostsParams>({
        search: searchParams.get("title_like") || undefined,
        userId: searchParams.get("userId") || undefined,
    });

    const { data: allPosts } = useGetPostsQuery({});
    const query = useGetPostsQuery(params);

    const allUsersId = allPosts ? Array.from(new Set(allPosts.map((p) => p.userId))).sort((a, b) => a - b) : [];
    const usersIdOptions = [{value: '', label: 'All'}, ...allUsersId.map(id => ({ value: id, label: `User ${id}` }))];

    return (
        <Container className="py-5">
            <Row className="mb-4">
                <Col>
                    <PostsSearchBar
                        allUsersId={usersIdOptions}
                        onSearchChange={(search) => setParams(prev => ({ ...prev, search }))}
                        onUserIdChange={(userId) => setParams(prev => ({ ...prev, userId }))}
                    />
                </Col>
                <Col className="mt-auto">
                    <Link to={routerConfig.postCreatePagePath}>
                        <Button variant='primary'>Create post</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <QueryBoundary {...query}>
                        {(posts: Post[]) => (
                            <div className="posts">
                                <Row className="g-3">
                                    {posts.map((post) => (
                                        <Col sm={3} key={post.id}>
                                            <PostCard post={post}/>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}
                    </QueryBoundary>
                </Col>
            </Row>
        </Container>
    );
};