import {expect, it} from "vitest"
import {render, screen} from "@testing-library/react";
import {CommentItem} from "@components/Commnets/CommentItem";
import "@testing-library/jest-dom";

const mockComment = {
    postId: 1,
    id: 1,
    name: "Test comment",
    email: "ushachovg324@gmail.com",
    body: "Test body",
}

it('render comment name, email, body', () => {
    render(<CommentItem comment={mockComment}/>)

    expect(screen.getByText("Test comment")).toBeInTheDocument()
    expect(screen.getByText("ushachovg324@gmail.com")).toBeInTheDocument()
    expect(screen.getByText("Test body")).toBeInTheDocument()
});