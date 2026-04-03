import {describe, expect, it, vi} from "vitest";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import {PostsSearchBar} from "./PostsSearchBar.tsx";

vi.mock("@hooks/useDebounce.ts", () => ({
    useDebounce: <T,>(value: T) => value,
}));

const allUsersId = [
    {value: "1", label: "User 1"},
    {value: "2", label: "User 2"},
];

const defaultProps = {
    allUsersId,
    onSearchChange: vi.fn(),
    onUserIdChange: vi.fn(),
    params: {search: "", userId: ""},
};

describe("PostsSearchBar", () => {
    it("renders search input", () => {
        render(<PostsSearchBar {...defaultProps}/>);

        expect(screen.getByPlaceholderText("Title post...")).toBeInTheDocument();
    });

    it("renders user select with options", () => {
        render(<PostsSearchBar {...defaultProps}/>);

        expect(screen.getByRole("option", {name: "User 1"})).toBeInTheDocument();
        expect(screen.getByRole("option", {name: "User 2"})).toBeInTheDocument();
    });

    it("renders search input with value from params", () => {
        render(<PostsSearchBar {...defaultProps} params={{search: "hello", userId: ""}}/>);

        expect(screen.getByPlaceholderText("Title post...")).toHaveValue("hello");
    });

    it("renders select with value from params", () => {
        render(<PostsSearchBar {...defaultProps} params={{search: "", userId: "2"}}/>);

        expect(screen.getByRole("combobox")).toHaveValue("2");
    });

    it("updates search input when user types", () => {
        render(<PostsSearchBar {...defaultProps}/>);

        const searchInput = screen.getByPlaceholderText("Title post...");
        fireEvent.change(searchInput, {target: {value: "Post"}});

        expect(searchInput).toHaveValue("Post");
    });

    it("calls onSearchChange when user types", async () => {
        const onSearchChange = vi.fn();
        render(<PostsSearchBar {...defaultProps} onSearchChange={onSearchChange}/>);

        fireEvent.change(screen.getByPlaceholderText("Title post..."), {target: {value: "Post"}});

        await waitFor(() => {
            expect(onSearchChange).toHaveBeenCalledWith("Post");
        });
    });

    it("calls onUserIdChange when user selects an option", () => {
        const onUserIdChange = vi.fn();
        render(<PostsSearchBar {...defaultProps} onUserIdChange={onUserIdChange}/>);

        fireEvent.change(screen.getByRole("combobox"), {target: {value: "1"}});

        expect(onUserIdChange).toHaveBeenCalledWith("1");
    });

    it("calls onSearchChange with empty string on initial render", () => {
        const onSearchChange = vi.fn();
        render(<PostsSearchBar {...defaultProps} onSearchChange={onSearchChange}/>);

        expect(onSearchChange).toHaveBeenCalledWith("");
    });
});