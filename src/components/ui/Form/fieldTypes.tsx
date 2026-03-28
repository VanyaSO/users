import {Form, type FormCheckProps, type FormControlProps, FormGroup, type FormSelectProps} from "react-bootstrap";

export type FormGroupProps = {
    className?: string;
    label?: string;
    isTouched?: boolean;
    errors?: string;
    controlId: string;
}

export type InputFieldProps = {
    variant: "input",
    group: FormGroupProps,
} & FormControlProps;

export type TextareaFieldProps = {
    variant: "textarea",
    group: FormGroupProps,
    rows?: number
} & FormControlProps;

export type SelectOption = { value: string | number, label: string };
export type SelectFieldProps = {
    variant: "select",
    group: FormGroupProps,
    options: SelectOption[]
} & FormSelectProps;

export type CheckboxFieldProps = {
    variant: "checkbox"
} & FormCheckProps;

export type RadioFieldProps = {
    variant: "radio"
} & FormCheckProps;

type OmitVariant<T> = Omit<T, "variant">;

export const fieldTypes = {
    input: ({group, ...rest}: OmitVariant<InputFieldProps>) => (
        <FormGroup {...group}>
            <Form.Control type="text" {...rest}  />
        </FormGroup>
    ),
    textarea: ({group, ...rest}: OmitVariant<TextareaFieldProps>) => (
        <FormGroup {...group}>
            <Form.Control as="textarea" {...rest}  />
        </FormGroup>
    ),
    select: ({group, options, ...props}: OmitVariant<SelectFieldProps>) => (
        <FormGroup {...group}>
            <Form.Select {...props}>
                {options.map(({value, label}: SelectOption) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </Form.Select>
        </FormGroup>
    ),
    checkbox: (props: OmitVariant<CheckboxFieldProps>) => <Form.Check type="checkbox" {...props} />,
    radio: (props: OmitVariant<RadioFieldProps>) => <Form.Check type="radio" {...props} />
}