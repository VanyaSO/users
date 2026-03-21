import { Container } from "react-bootstrap";
import { Header } from "@/components/Layout/Header.tsx";
import { Footer } from "@/components/Layout/Footer.tsx";
import { Outlet } from "react-router";

export const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <Container as="main" className="flex-grow-1 my-4">
                <Outlet />
            </Container>

            <Footer />
        </div>
    );
};