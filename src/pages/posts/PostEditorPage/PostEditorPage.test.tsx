import {describe, it, expect, vi, beforeEach} from "vitest";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import {PostEditorPage} from "@pages/posts/PostEditorPage/PostEditorPage.tsx";
import {MemoryRouter, Route, Routes} from "react-router";
import store from "@/store";
import {Provider} from "react-redux";
import {ToastProvider} from "@/contexts/ToastСontext/ToastProvider.tsx";
import type {PostCreatePayload, PostUpdatePayload} from "@t/post.ts";

const mockCreate = vi.fn();
const mockUpdate = vi.fn();
const mockNavigate = vi.fn();

vi.mock("@store/api/postsApi.ts", async () => {
    const actual = await vi.importActual<typeof import("@store/api/postsApi.ts")>("@store/api/postsApi.ts");

    return {
        ...actual,
        useGetPostByIdQuery: () => ({
            data: {id: 1, title: "Post title", userId: 2, body: "Post body"},
            isFetching: false,
            error: undefined,
        }),
        useCreatePostMutation: () => [mockCreate, {isLoading: false}],
        useUpdatePostMutation: () => [mockUpdate, {isLoading: false}],
    };
});

vi.mock("react-router", async () => {
    const actual = await vi.importActual<typeof import("react-router")>("react-router");
    return {...actual, useNavigate: () => mockNavigate};
});

vi.mock("@components/Posts/PostEditorForm/PostEditorForm.tsx", () => ({
    PostEditorForm: ({onSubmit}: {onSubmit: (payload: PostCreatePayload | PostUpdatePayload) => void}) => (
        <button onClick={() => onSubmit({title: "New", body: "Text"})}>Submit</button>
    ),
}));

vi.mock("@hooks/useToast.ts", () => ({
    useToast: () => vi.fn(),
}));

const renderInCreate = () =>
    render(
        <Provider store={store}>
            <ToastProvider>
                <MemoryRouter>
                    <PostEditorPage/>
                </MemoryRouter>
            </ToastProvider>
        </Provider>
    );

const renderInEdit = () =>
    render(
        <Provider store={store}>
            <ToastProvider>
                <MemoryRouter initialEntries={["/posts/1"]}>
                    <Routes>
                        <Route path="/posts/:id" element={<PostEditorPage/>}/>
                    </Routes>
                </MemoryRouter>
            </ToastProvider>
        </Provider>
    );

describe("PostEditorPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders page in create mode", () => {
        renderInCreate();

        expect(screen.getByText("Create post")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /back/i})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /submit/i})).toBeInTheDocument();
    });

    it("renders page in edit mode", () => {
        renderInEdit();

        expect(screen.getByText("Edit post")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /back/i})).toBeInTheDocument();
    });

    it("calls navigate(-1) when Back button is clicked", () => {
        renderInCreate();

        fireEvent.click(screen.getByRole("button", {name: /back/i}));

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it("calls createPost on submit in create mode", () => {
        mockCreate.mockReturnValue({unwrap: () => Promise.resolve()});
        renderInCreate();

        fireEvent.click(screen.getByRole("button", {name: /submit/i}));

        expect(mockCreate).toHaveBeenCalledWith({title: "New", body: "Text"});
    });

    it("calls updatePost on submit in edit mode", () => {
        mockUpdate.mockReturnValue({unwrap: () => Promise.resolve()});
        renderInEdit();

        fireEvent.click(screen.getByRole("button", {name: /submit/i}));

        expect(mockUpdate).toHaveBeenCalledWith({id: "1", title: "New", body: "Text"});
    });

    it("navigates to posts page after successful create", async () => {
        mockCreate.mockReturnValue({unwrap: () => Promise.resolve()});
        renderInCreate();

        fireEvent.click(screen.getByRole("button", {name: /submit/i}));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });
});