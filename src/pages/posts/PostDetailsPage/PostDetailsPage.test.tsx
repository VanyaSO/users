import {describe, it, expect, vi, beforeEach} from "vitest";
import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {MemoryRouter, Routes, Route} from "react-router";
import {PostDetailsPage} from "@pages/posts/PostDetailsPage/PostDetailsPage.tsx";
import type {Comment} from "@t/comment.ts";

const mockNavigate = vi.fn();

vi.mock("@store/api/postsApi.ts", () => ({
    useGetPostByIdQuery: () => ({
        data: {id: 1, title: "Test Post", userId: 2, body: "Post body"},
        isFetching: false,
        error: undefined,
    }),
}));

vi.mock("@store/api/commentsApi.ts", () => ({
    useGetCommentsByPostIdQuery: () => ({
        data: [
            {id: 1, body: "Comment 1"},
            {id: 2, body: "Comment 2"},
        ],
        isFetching: false,
        error: undefined,
    }),
}));

vi.mock("react-router", async () => {
    const actual = await vi.importActual<typeof import("react-router")>("react-router");
    return {...actual, useNavigate: () => mockNavigate};
});

vi.mock("@components/Comments/CommentsList/CommentsList.tsx", () => ({
    CommentsList: ({comments}: {comments: Comment[]}) => (
        <div>
            {comments.map((c: Comment) => (
                <p key={c.id}>{c.body}</p>
            ))}
        </div>
    ),
}));

const renderPage = () =>
    render(
        <MemoryRouter initialEntries={["/posts/1"]}>
            <Routes>
                <Route path="/posts/:id" element={<PostDetailsPage/>}/>
            </Routes>
        </MemoryRouter>
    );

describe("PostDetailsPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders post title, subtitle and body", () => {
        renderPage();

        expect(screen.getByText("Test Post")).toBeInTheDocument();
        expect(screen.getByText(/Post 1 - User 2/)).toBeInTheDocument();
        expect(screen.getByText("Post body")).toBeInTheDocument();
    });

    it("renders comments list", () => {
        renderPage();

        expect(screen.getByText("Comment 1")).toBeInTheDocument();
        expect(screen.getByText("Comment 2")).toBeInTheDocument();
    });

    it("calls navigate(-1) when Back button is clicked", () => {
        renderPage();

        fireEvent.click(screen.getByRole("button", {name: /back/i}));

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});