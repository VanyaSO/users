import {Button, Col, Container, Row} from "react-bootstrap";
import {Typography} from "@components/ui/Typography";
import {PostEditorForm} from "@components/Posts/PostEditorForm";
import {useNavigate, useParams} from "react-router";
import {QueryBoundary} from "@components/ui/QueryBoundary";
import {useCreatePostMutation, useGetPostByIdQuery, useUpdatePostMutation} from "@store/api/postsApi.ts";
import routerConfig from "@routes/routerConfig.ts";
import {useRef} from "react";
import {useToast} from "@hooks/useToast.ts";
import type {PostCreatePayload, PostUpdatePayload} from "@t/post.ts";

export const PostEditorPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const query = useGetPostByIdQuery(id!, {skip: !id});
    const [createPost, {isLoading: isCreating}] = useCreatePostMutation();
    const [updatePost, {isLoading: isUpdating}] = useUpdatePostMutation();

    const showToast = useToast();

    const abortRef = useRef<ReturnType<typeof createPost> | ReturnType<typeof updatePost> | null>(null);

    const isEdit = !!id;

    const handleSubmit = async (payload: PostUpdatePayload | PostCreatePayload) => {
        const request = isEdit ? updatePost({id: id!, ...payload}) : createPost(payload);

        abortRef.current = request;

        try {
            await request.unwrap();
            showToast(`Successfully created!`);
            navigate(routerConfig.postsPagePath)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            showToast(`Error: ${message}`, "danger");
        }
    }

    const handleBack = () => {
        abortRef.current?.abort();
        navigate(-1)
    }

    return (
        <Container className="py-5">
            <QueryBoundary {...query}>
                <Row>
                    <Col sm={4} className="mx-auto">
                        <Typography
                            variant="h2"
                            className="text-center mb-4"
                        >
                            {isEdit ? "Edit" : "Create"} post
                        </Typography>
                        <PostEditorForm
                            post={query.data}
                            onSubmit={handleSubmit}
                            isLoading={isUpdating || isCreating}
                        />
                        <Button
                            variant="secondary"
                            className="w-100 mt-3"
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    </Col>
                </Row>
            </QueryBoundary>
        </Container>
    )
}