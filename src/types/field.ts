import type {FormCheckProps, FormControlProps, FormSelectProps} from "react-bootstrap";
import type {FormGroupProps} from "@components/ui/Form/FormGroup/FormGroup.tsx";
import type {OmitChildren} from "@t/shared.ts";

export type InputFieldProps = {
    variant: "input",
    group: OmitChildren<FormGroupProps>,
} & FormControlProps;

export type TextareaFieldProps = {
    variant: "textarea",
    group: OmitChildren<FormGroupProps>,
    rows?: number
} & FormControlProps;

export type SelectOption = { value: string | number, label: string };
export type SelectFieldProps = {
    variant: "select",
    group: OmitChildren<FormGroupProps>,
    options: SelectOption[]
} & FormSelectProps;

export type CheckboxFieldProps = {
    variant: "checkbox"
} & FormCheckProps;

export type RadioFieldProps = {
    variant: "radio",
    group: OmitChildren<FormGroupProps>,
    name: string,
    values: string[]
} & FormCheckProps;