import {FormGroup} from "@components/ui/Form/FormGroup/FormGroup.tsx";
import type {
    CheckboxFieldProps,
    InputFieldProps,
    RadioFieldProps,
    SelectFieldProps,
    SelectOption,
    TextareaFieldProps
} from "@t/field.ts";
import { Form } from "react-bootstrap";
import type {OmitVariant} from "@t/shared.ts";

export const fieldTypes = {
    input: ({group, ...rest}: OmitVariant<InputFieldProps>) => (
        <FormGroup {...group}>
            <Form.Control type="text" aria-label={rest.name} {...rest}  />
        </FormGroup>
    ),
    textarea: ({group, ...rest}: OmitVariant<TextareaFieldProps>) => (
        <FormGroup {...group}>
            <Form.Control as="textarea" aria-label={rest.name} {...rest}  />
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
    radio: ({group, values, ...props}: OmitVariant<RadioFieldProps>) => (
        <FormGroup {...group}>
            {values.map(() => <Form.Check type="radio" {...props} />)}
        </FormGroup>
    )
}