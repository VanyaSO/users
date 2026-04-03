import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router";
import {PostCard} from "./PostCard";
import "@testing-library/jest-dom";

const mockPost = {
    id: 1,
    title: "Test Post",
    userId: 42,
    body: "This is a test post body",
};

vi.mock("@routes/routerConfig", () => ({
    getPostDetailsPath: (id: number) => `/posts/${id}`,
    getPostUpdatePath: (id: number) => `/posts/update/${id}`,
}));

describe("PostCard", () => {
    it("renders post title, body and userId", () => {
        render(
            <BrowserRouter>
                <PostCard post={mockPost}/>
            </BrowserRouter>
        );

        expect(screen.getByText("Test Post")).toBeInTheDocument();
        expect(screen.getByText("This is a test post body")).toBeInTheDocument();
        expect(screen.getByText("User 42")).toBeInTheDocument();
    });

    it("renders Details and Edit links with correct href", () => {
        render(
            <BrowserRouter>
                <PostCard post={mockPost}/>
            </BrowserRouter>
        );

        expect(screen.getByRole("link", {name: /details/i})).toHaveAttribute("href", "/posts/1");
        expect(screen.getByRole("link", {name: /edit/i})).toHaveAttribute("href", "/posts/update/1");
    });
});