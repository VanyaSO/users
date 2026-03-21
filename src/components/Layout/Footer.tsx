import { Container, Row, Col } from "react-bootstrap";

export const Footer = () => {
    return (
        <footer className="py-5 bg-light text-center text-muted">
            <Container>
                <Row className="mb-2">
                    <Col>
                        <p className="mb-0">
                            Blog template built for{" "}
                            <a href="https://getbootstrap.com/">Bootstrap</a> by{" "}
                            <a href="https://x.com/mdo">@mdo</a>.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <a href="#">Back to top</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};