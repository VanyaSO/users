import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {Field} from "./Field";

vi.mock("@components/ui/Form/fieldTypes", () => ({
    fieldTypes: {
        input: (props: { placeholder: string }) => <div data-testid="input">{props.placeholder}</div>,
        textarea: (props: { placeholder: string }) => <div data-testid="textarea">{props.placeholder}</div>,
    },
}));

describe("Field", () => {
    it("renders correct component based on variant", () => {
        render(
            <Field
                variant="input"
                group={{controlId: "test-id"}}
            />
        );

        expect(screen.getByTestId("input")).toBeInTheDocument();
    })

    it("renders another component when variant changes", () => {
        render(
            <Field
                variant="textarea"
                group={{controlId: "test-id"}}
            />
        );

        expect(screen.getByTestId("textarea")).toBeInTheDocument();
    })

    it("passes props to component", () => {
        render(
            <Field
                variant="textarea"
                placeholder="hello"
                group={{controlId: "test-id"}}
            />
        );

        expect(screen.getByText("hello")).toBeInTheDocument();
    })
})