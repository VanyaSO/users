import {describe, expect, it, vi} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import {act} from "react";
import "@testing-library/jest-dom";
import {PostEditorForm} from "./PostEditorForm.tsx";

const mockPost = {
    id: 1,
    title: "Post 1 valid title",
    body: "Body 1 long enough to pass validation",
    userId: 1,
};

describe("PostEditorForm", () => {
    it("renders empty fields when no post is provided", () => {
        render(<PostEditorForm onSubmit={vi.fn()} isLoading={false}/>);

        expect(screen.getByPlaceholderText("Title for post...")).toHaveValue("");
        expect(screen.getByPlaceholderText("Body for post...")).toHaveValue("");
    });

    it("renders fields pre-filled with post data", () => {
        render(<PostEditorForm post={mockPost} onSubmit={vi.fn()} isLoading={false}/>);

        expect(screen.getByPlaceholderText("Title for post...")).toHaveValue(mockPost.title);
        expect(screen.getByPlaceholderText("Body for post...")).toHaveValue(mockPost.body);
    });

    it("renders the Send button", () => {
        render(<PostEditorForm onSubmit={vi.fn()} isLoading={false}/>);

        expect(screen.getByRole("button", {name: /send/i})).toBeInTheDocument();
    });

    it("disables the Send button when isLoading is true and renders spinner", () => {
        render(<PostEditorForm onSubmit={vi.fn()} isLoading={true}/>);

        const button = screen.getByRole("button", {name: /send/i});
        expect(button).toBeDisabled();
        expect(button.querySelector(".spinner-border")).toBeInTheDocument();
    });

    it("updates title field when user types", async () => {
        render(<PostEditorForm onSubmit={vi.fn()} isLoading={false}/>);

        await act(async () => {
            screen.getByPlaceholderText("Title for post...").focus();
            screen.getByPlaceholderText("Title for post...").dispatchEvent(
                new Event("input", {bubbles: true})
            );
            Object.defineProperty(screen.getByPlaceholderText("Title for post..."), "value", {value: "New title"});
            screen.getByPlaceholderText("Title for post...").dispatchEvent(
                new Event("change", {bubbles: true})
            );
        });

        expect(screen.getByPlaceholderText("Title for post...")).toHaveValue("New title");
    });

    it("updates body field when user types", async () => {
        render(<PostEditorForm onSubmit={vi.fn()} isLoading={false}/>);

        await act(async () => {
            const bodyInput = screen.getByPlaceholderText("Body for post...");
            Object.defineProperty(bodyInput, "value", {value: "New body"});
            bodyInput.dispatchEvent(new Event("change", {bubbles: true}));
        });

        expect(screen.getByPlaceholderText("Body for post...")).toHaveValue("New body");
    });

    it("does not show dirty warning before first submit", () => {
        render(<PostEditorForm post={mockPost} onSubmit={vi.fn()} isLoading={false}/>);

        expect(screen.queryByText(/nothing has changed/i)).not.toBeInTheDocument();
    });

    it("shows dirty warning when submitting unchanged post", async () => {
        render(<PostEditorForm post={mockPost} onSubmit={vi.fn()} isLoading={false}/>);

        await act(async () => {
            screen.getByRole("button", {name: /send/i}).closest("form")!.dispatchEvent(
                new Event("submit", {bubbles: true, cancelable: true})
            );
        });

        expect(screen.getByText(/nothing has changed/i)).toBeInTheDocument();
    });

    it("does not call onSubmit when post is unchanged", async () => {
        const onSubmit = vi.fn();
        render(<PostEditorForm post={mockPost} onSubmit={onSubmit} isLoading={false}/>);

        await act(async () => {
            screen.getByRole("button", {name: /send/i}).closest("form")!.dispatchEvent(
                new Event("submit", {bubbles: true, cancelable: true})
            );
        });

        expect(onSubmit).not.toHaveBeenCalled();
    });

    it("calls onSubmit with updated values after editing", async () => {
        const onSubmit = vi.fn();
        render(<PostEditorForm post={mockPost} onSubmit={onSubmit} isLoading={false}/>);

        const titleInput = screen.getByPlaceholderText("Title for post...");

        await act(async () => {
            Object.defineProperty(titleInput, "value", {value: "Updated title long enough", writable: true});
            titleInput.dispatchEvent(new Event("change", {bubbles: true}));
        });

        await act(async () => {
            titleInput.closest("form")!.dispatchEvent(
                new Event("submit", {bubbles: true, cancelable: true})
            );
        });

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith({
                title: "Updated title long enough",
                body: mockPost.body,
            });
        });
    });

    it("calls onSubmit with values when creating a new post", async () => {
        const onSubmit = vi.fn();
        render(<PostEditorForm onSubmit={onSubmit} isLoading={false}/>);

        await act(async () => {
            const titleInput = screen.getByPlaceholderText("Title for post...");
            Object.defineProperty(titleInput, "value", {value: "New title for post", writable: true});
            titleInput.dispatchEvent(new Event("change", {bubbles: true}));

            const bodyInput = screen.getByPlaceholderText("Body for post...");
            Object.defineProperty(bodyInput, "value", {value: "New body long enough to pass validation", writable: true});
            bodyInput.dispatchEvent(new Event("change", {bubbles: true}));
        });

        await act(async () => {
            screen.getByPlaceholderText("Title for post...").closest("form")!.dispatchEvent(
                new Event("submit", {bubbles: true, cancelable: true})
            );
        });

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith({
                title: "New title for post",
                body: "New body long enough to pass validation",
            });
        });
    });
});