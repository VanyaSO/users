import {beforeEach, describe, expect, it, vi} from "vitest";
import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import {Pagination} from "./Pagination";

describe("Pagination", () => {
    beforeEach(() => {
        window.scrollTo = vi.fn();
    });

    it("does not render if totalPages <= 1", () => {
        const {container} = render(
            <Pagination
                currentPage={1}
                totalPages={1}
                onChange={() => {}}
            />
        );

        expect(container.firstChild).toBeNull();
    })

    it("renders correct number of pages", () => {
        render(
            <Pagination
                currentPage={1}
                totalPages={3}
                onChange={() => {}}
            />
        );

        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    })

    it("renders current page as active", () => {
        render(
            <Pagination
                currentPage={2}
                totalPages={3}
                onChange={() => {}}
            />
        );

        const activePage = screen.getByText("2");
        expect(activePage.parentElement).toHaveClass("active");
    })

    it("calls onChange when page is clicked", () => {
        const onChange = vi.fn();

        render(
            <Pagination
                currentPage={1}
                totalPages={3}
                onChange={onChange}
            />
        );

        fireEvent.click(screen.getByText("2"));

        expect(onChange).toHaveBeenCalledWith(2);
    });

    it("scrolls to top when page changes", () => {
        render(
            <Pagination
                currentPage={1}
                totalPages={3}
                onChange={() => {}}
            />
        );

        fireEvent.click(screen.getByText("2"));

        expect(window.scrollTo).toHaveBeenCalled();
    });
})