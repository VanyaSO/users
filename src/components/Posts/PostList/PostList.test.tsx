import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {PostList} from "./PostList";
import type {Post} from "@t/post.ts";

vi.mock("@components/Posts/PostCard", () => ({
    PostCard: ({post}: {post: Post}) => <div>Post: {post.title}</div>,
}));

const mockPosts: Post[] = [
    {id: 1, title: "Post 1", userId: 1, body: "Body 1"},
    {id: 2, title: "Post 2", userId: 2, body: "Body 2"},
];

describe("PostList", () => {
    it("renders all posts", () => {
        render(<PostList posts={mockPosts}/>);

        expect(screen.getByText("Post: Post 1")).toBeInTheDocument();
        expect(screen.getByText("Post: Post 2")).toBeInTheDocument();
    });

    it("renders correct number of posts", () => {
        render(<PostList posts={mockPosts}/>);

        expect(screen.getAllByText(/Post:/i)).toHaveLength(2);
    });

    it("applies custom className", () => {
        const {container} = render(<PostList posts={mockPosts} className="my-class"/>);

        expect(container.firstChild).toHaveClass("my-class");
    });
});