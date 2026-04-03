import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {PostsPage} from "@pages/posts/PostsPage/PostsPage.tsx";
import {BrowserRouter} from "react-router";

vi.mock("@store/api/postsApi.ts", () => ({
    useGetPostsQuery: () => ({
        data: {
            totalCount: 22,
            posts: [
                {id: 1, title: "Post 1", userId: 1, body: "Body 1"},
                {id: 2, title: "Post 2", userId: 2, body: "Body 2"},
            ]
        },
        error: undefined,
        isFetching: false,
        isUninitialized: false,
        refetch: vi.fn(),
        status: "fulfilled",
        endpointName: "getPosts",
        originalArgs: undefined,
        requestId: "1",
        startedTimeStamp: Date.now(),
        fulfilledTimeStamp: Date.now(),
    }),
}));

vi.mock("@store/api/usersApi.ts", () => ({
    useGetUsersQuery: () => ({
        data: [{id: 1}],
        error: undefined,
        isFetching: false,
        isUninitialized: false,
        refetch: vi.fn(),
        status: "fulfilled",
        endpointName: "getUsers",
        originalArgs: undefined,
        requestId: "1",
        startedTimeStamp: Date.now(),
        fulfilledTimeStamp: Date.now(),
    }),
}));

describe("PostsPage", () => {
    it("renders posts from the query", () => {
        render(
            <BrowserRouter>
                <PostsPage/>
            </BrowserRouter>
        );

        expect(screen.getByText("Post 1")).toBeInTheDocument();
        expect(screen.getByText("Post 2")).toBeInTheDocument();
    });

    it("renders users in the search bar", () => {
        render(
            <BrowserRouter>
                <PostsPage/>
            </BrowserRouter>
        );

        const userOption = screen.getByRole("option", {name: "User 1"});
        expect(userOption).toBeInTheDocument();
    });

    it("renders Create post button with correct link", () => {
        render(
            <BrowserRouter>
                <PostsPage/>
            </BrowserRouter>
        );

        const createButton = screen.getByRole("link", {name: /Create post/i});
        expect(createButton).toHaveAttribute("href", "/posts/create");
    });

    it("renders pagination with correct pages", () => {
        render(
            <BrowserRouter>
                <PostsPage/>
            </BrowserRouter>
        );

        expect(screen.getByText("1")).toBeInTheDocument();
    });

    it('updates search params when user types in search bar', () => {
        render(
            <BrowserRouter>
                <PostsPage/>
            </BrowserRouter>
        );

        const searchInput = screen.getByRole("textbox");
        fireEvent.change(searchInput, {target: {value: "Test search"}});

        expect(searchInput).toHaveValue("Test search");
    });
})