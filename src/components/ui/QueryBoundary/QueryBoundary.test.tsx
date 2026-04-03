import {describe, it, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {QueryBoundary} from "./QueryBoundary";
import "@testing-library/jest-dom";

const MockError = ({message}: {message: string}) => <div>{message}</div>;

describe("QueryBoundary", () => {
    it("renders default spinner when fetching", () => {
        render(<QueryBoundary isFetching={true} isUninitialized={false}>Children</QueryBoundary>);

        expect(screen.queryByText("Children")).not.toBeInTheDocument();
    });

    it("renders custom loadingFallback when fetching", () => {
        render(
            <QueryBoundary isFetching={true} isUninitialized={false} loadingFallback={<div>Loading...</div>}>
                Children
            </QueryBoundary>
        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders children when data is present", () => {
        render(
            <QueryBoundary isFetching={false} isUninitialized={false} data={{foo: "bar"}}>
                Children
            </QueryBoundary>
        );

        expect(screen.getByText("Children")).toBeInTheDocument();
    });

    it("renders default error alert when SerializedError occurs", () => {
        render(
            <QueryBoundary isFetching={false} isUninitialized={false} error={{message: "Oops"}}>
                Children
            </QueryBoundary>
        );

        expect(screen.getByText("Oops")).toBeInTheDocument();
    });

    it("renders custom errorFallback when error occurs", () => {
        render(
            <QueryBoundary isFetching={false} isUninitialized={false} error={{message: "Oops"}} errorFallback={MockError}>
                Children
            </QueryBoundary>
        );

        expect(screen.getByText("Oops")).toBeInTheDocument();
    });

    it("renders error message from FetchBaseQueryError status", () => {
        render(
            <QueryBoundary isFetching={false} isUninitialized={false} error={{status: 404, data: "Not found"}}>
                Children
            </QueryBoundary>
        );

        expect(screen.getByText(/request failed with status 404/i)).toBeInTheDocument();
    });

    it("renders default notFound when data is null", () => {
        render(
            <QueryBoundary isFetching={false} isUninitialized={false} data={null}>
                Children
            </QueryBoundary>
        );

        expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });

    it("renders default notFound when data is undefined", () => {
        render(
            <QueryBoundary isFetching={false} isUninitialized={false} data={undefined}>
                Children
            </QueryBoundary>
        );

        expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });

    it("does not render notFound when isUninitialized is true", () => {
        render(
            <QueryBoundary isFetching={false} isUninitialized={true}>
                Children
            </QueryBoundary>
        );

        expect(screen.queryByText(/not found/i)).not.toBeInTheDocument();
    });

    it("renders default empty alert when isEmpty returns true", () => {
        render(
            <QueryBoundary isFetching={false} isUninitialized={false} data={[]} isEmpty={(d: unknown[]) => !d.length}>
                Children
            </QueryBoundary>
        );

        expect(screen.getByText(/empty/i)).toBeInTheDocument();
    });

    it("renders custom emptyFallback when data is empty", () => {
        render(
            <QueryBoundary
                isFetching={false}
                isUninitialized={false}
                data={[]}
                isEmpty={(d: unknown[]) => !d.length}
                emptyFallback={<div>No items yet</div>}
            >
                Children
            </QueryBoundary>
        );

        expect(screen.getByText("No items yet")).toBeInTheDocument();
    });

    it("renders children when data is non-empty array", () => {
        render(
            <QueryBoundary isFetching={false} isUninitialized={false} data={[1, 2, 3]} isEmpty={(d: unknown[]) => !d.length}>
                Children
            </QueryBoundary>
        );

        expect(screen.getByText("Children")).toBeInTheDocument();
    });
});