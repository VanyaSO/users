import { Navbar, Container } from "react-bootstrap";

export const Header = () => {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#">
                    <img
                        src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
                        alt="Logo"
                        width="30"
                        height="24"
                        className="d-inline-block align-text-top"
                    />
                    Bootstrap
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
};