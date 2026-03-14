import {Header} from "@/components/Layout/Header.tsx";
import {Outlet} from "react-router-dom";
import {Footer} from "@/components/Layout/Footer.tsx";

export const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <main className="flex-grow-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}