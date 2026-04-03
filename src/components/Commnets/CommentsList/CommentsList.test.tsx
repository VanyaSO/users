import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {CommentsList} from "./CommentsList";
import type {Comment as CommentType} from "@t/comment";

vi.mock("../CommentItem", () => ({
    CommentItem: ({comment}: { comment: CommentType }) => (
        <div>Comment: {comment.name}</div>
    ),
}));

const mockComments: CommentType[] = [
    {
        id: 1,
        postId: 1,
        name: "Comment 1",
        email: "test1@mail.com",
        body: "Body 1",
    },
    {
        id: 2,
        postId: 1,
        name: "Comment 2",
        email: "test2@mail.com",
        body: "Body 2",
    },
];

describe("CommentsList", () => {
    it("renders all comments", () => {
        render(<CommentsList comments={mockComments}/>);

        expect(screen.getByText("Comment: Comment 1")).toBeInTheDocument();
        expect(screen.getByText("Comment: Comment 2")).toBeInTheDocument();
    });

    it("renders correct number of comments", () => {
        render(<CommentsList comments={mockComments}/>);

        const items = screen.getAllByText(/Comment:/i);
        expect(items).toHaveLength(2);
    });

    it("applies className", () => {
        const {container} = render(
            <CommentsList comments={mockComments} className="my-class"/>
        );

        expect(container.firstChild).toHaveClass("my-class");
    });
});