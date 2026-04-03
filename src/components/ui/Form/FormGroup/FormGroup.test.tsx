import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {FormGroup} from "@components/ui/Form/FormGroup/FormGroup.tsx";

describe("FormGroup", () => {
    it("renders children", () => {
        render(
            <FormGroup controlId="testId">
                children
            </FormGroup>
        )

        expect(screen.getByText("children")).toBeInTheDocument();
    })

    it("renders label when provided", () => {
        render(
            <FormGroup controlId="test-id" label="Username">
                input
            </FormGroup>
        );

        expect(screen.getByText("Username")).toBeInTheDocument();
    });

    it("does not render label when not provided", () => {
        render(
            <FormGroup controlId="test-id">
                input
            </FormGroup>
        );

        expect(screen.queryByText("Username")).not.toBeInTheDocument();
    });

    it("renders error when touched and error exists", () => {
        render(
            <FormGroup
                controlId="test-id"
                isTouched={true}
                errors="Error message"
            >
                input
            </FormGroup>
        );

        expect(screen.getByText("Error message")).toBeInTheDocument();
    });

    it("does not render error if not touched", () => {
        render(
            <FormGroup
                controlId="test-id"
                isTouched={false}
                errors="Error message"
            >
                input
            </FormGroup>
        );

        expect(screen.queryByText("Error message")).not.toBeInTheDocument();
    });

    it("does not render error if no error text", () => {
        render(
            <FormGroup
                controlId="test-id"
                isTouched={true}
                errors={undefined}
            >
                input
            </FormGroup>
        );

        expect(screen.queryByText("Error message")).not.toBeInTheDocument();
    });

    it("applies className", () => {
        const { container } = render(
            <FormGroup
                controlId="test-id"
                className="my-class"
            >
                input
            </FormGroup>
        );

        expect(container.firstChild).toHaveClass("my-class");
    });
})