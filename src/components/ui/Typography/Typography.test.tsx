import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Typography } from "./Typography";

describe("Typography", () => {
    it("renders children", () => {
        render(<Typography>Test text</Typography>);

        expect(screen.getByText("Test text")).toBeInTheDocument();
    });

    it("renders default as <p>", () => {
        render(<Typography>Paragraph</Typography>);

        const element = screen.getByText("Paragraph");
        expect(element.tagName).toBe("P");
    });

    it("renders correct tag based on variant", () => {
        render(<Typography variant="h1">Heading</Typography>);

        const element = screen.getByText("Heading");
        expect(element.tagName).toBe("H1");
    });

    it("applies className", () => {
        render(<Typography className="my-class">Styled</Typography>);

        const element = screen.getByText("Styled");
        expect(element).toHaveClass("my-class");
    });
});