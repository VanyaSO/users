import {Link, useSearchParams} from "react-router";
import {Container, Row, Col, Button} from "react-bootstrap";
import {PostsSearchBar} from "@components/Posts/PostsSearchBar.tsx";
import routerConfig from "@routes/routerConfig.ts";
import {useCallback} from "react";
import type {PostsSearchParams} from "@t/Post.ts";
import {Pagination} from "@components/ui/Pagination.tsx";
import {usePagination} from "@hooks/usePagination.ts";
import {useGetUsersQuery} from "@store/api/usersApi.ts";
import {useGetPostsQuery} from "@store/api/postsApi.ts";
import {QueryBoundary} from "@components/ui/QueryBoundary.tsx";
import {PostList} from "@components/Posts/PostList.tsx";

export const PostsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {page, onPageChange} = usePagination();

    const postsSearchParams: PostsSearchParams = {
        search: searchParams.get("title_like") || undefined,
        userId: searchParams.get("userId") || undefined,
    };

    const postsQuery = useGetPostsQuery({
        ...postsSearchParams,
        page
    });

    const totalPages = Math.ceil((postsQuery.data?.totalCount || 0) / 12);

    const { data: users } = useGetUsersQuery();
    const allUsersId = users ? Array.from(users.map((user) => user.id)).sort((a, b) => a - b) : [];
    const usersIdOptions = [{value: "", label: "All"}, ...allUsersId.map(id => ({value: id, label: `User ${id}`}))];

    const updateParams = useCallback((newParams: Partial<PostsSearchParams>) => {
        const newSearchParams = new URLSearchParams(searchParams);

        if ("search" in newParams) {
            if (newParams.search) {
                newSearchParams.set("title_like", newParams.search)
            } else {
                newSearchParams.delete("title_like")
            }
        }

        if ("userId" in newParams) {
            if (newParams.userId) {
                newSearchParams.set("userId", String(newParams.userId))
            } else {
                newSearchParams.delete("userId")
            }
        }

        if (newSearchParams.has("_page") && totalPages === 1) {
            newSearchParams.delete("_page")
        }

        setSearchParams(newSearchParams, {replace: true});
    }, [searchParams, setSearchParams, totalPages]);

    const onSearchChange = useCallback((search: string) => {
        updateParams({search});
    }, [updateParams]);

    const onUserIdChange = useCallback((userId: string) => {
        updateParams({userId});
    }, [updateParams]);

    return (
        <Container className="py-5">
            <Row className="mb-4">
                <Col>
                    <PostsSearchBar
                        allUsersId={usersIdOptions}
                        onSearchChange={onSearchChange}
                        onUserIdChange={onUserIdChange}
                        params={postsSearchParams}
                    />
                </Col>
                <Col className="mt-auto">
                    <Link to={routerConfig.postCreatePagePath}>
                        <Button variant='primary'>Create post</Button>
                    </Link>
                </Col>
            </Row>
            <QueryBoundary
                {...postsQuery}
                isEmpty={({ posts }) => posts.length === 0}
            >
                <PostList posts={postsQuery.data?.posts ?? []} />
                <Row>
                    <Col className="mt-5">
                        <Pagination
                            className="justify-content-center"
                            currentPage={page}
                            totalPages={totalPages}
                            onChange={onPageChange}
                        />
                    </Col>
                </Row>
            </QueryBoundary>
        </Container>
    );
};