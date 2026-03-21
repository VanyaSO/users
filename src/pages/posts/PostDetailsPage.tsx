import {useNavigate, useParams} from "react-router";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {QueryBoundary} from "@/components/ui/QueryBoundary.tsx";
import {useGetPostByIdQuery} from "@/store/postsApi";

export const PostDetailsPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const query = useGetPostByIdQuery(id!);

    return (
        <Container className="py-5">
            <QueryBoundary {...query}>
                {(post) => (
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <Card className="shadow-sm">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="text-primary">{post.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        Post {post.id} - User {post.userId}
                                    </Card.Subtitle>
                                    <Card.Text className="mt-4">{post.body}</Card.Text>
                                    <Button
                                        variant="secondary"
                                        className="mt-auto"
                                        onClick={() => navigate(-1)}
                                    >
                                        Back
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </QueryBoundary>
        </Container>

    )
}