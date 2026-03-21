import {Button, Col, Container, Row} from "react-bootstrap";
import {Typography} from "@/components/ui/Typography.tsx";
import {PostEditorForm} from "@/components/Posts/PostEditorForm/PostEditorForm.tsx";
import {useNavigate, useParams} from "react-router";
import {QueryBoundary} from "@/components/ui/QueryBoundary.tsx";
import {useCreatePostMutation, useGetPostByIdQuery, useUpdatePostMutation} from "@/store/postsApi";
import type {PostCreatePayload, PostUpdatePayload} from "@/store/postsApi/types.ts";

export const PostEditorPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const query = useGetPostByIdQuery(id!, {skip: !id});

    const [createPost, {isLoading: isCreating}] = useCreatePostMutation();
    const [updatePost, {isLoading: isUpdating}] = useUpdatePostMutation();

    const isEdit = !!id;

    const handleSubmit = (payload: PostUpdatePayload | PostCreatePayload) => {
        if (isEdit) {
            updatePost({
                id: id!,
                ...payload
            });
        } else {
            createPost(payload);
        }
    }

    return (
        <Container className="py-5">
            <QueryBoundary {...query}>
                {(post) => {
                    const editorText = isEdit ? "Edit" : "Create";

                    return (
                        <Row>
                            <Col sm={4} className="mx-auto">
                                <Typography variant="h2" className="text-center mb-4">{editorText} post</Typography>
                                <PostEditorForm post={post}
                                                onSubmit={handleSubmit}
                                                isLoading={isCreating || isUpdating}
                                />
                                <Button
                                    variant="secondary"
                                    className="w-100 mt-3"
                                    onClick={() => navigate(-1)}
                                >
                                    Back
                                </Button>
                            </Col>
                        </Row>
                    )
                }}
            </QueryBoundary>
        </Container>
    )
}