import {FormGroup, type FormGroupProps} from "@/components/ui/Form/FormGroup.tsx";
import {Form, type FormSelectProps} from "react-bootstrap";

export type SelectOption = { value: string | number, label: string };

type SelectProps = {
    group: Omit<FormGroupProps, "children">
    options: SelectOption[]
} & FormSelectProps

export const Select = ({group, options, ...rest}: SelectProps) => {
    return (
        <FormGroup {...group}>
            <Form.Select {...rest}>
                {options.map(({value, label}: SelectOption) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </Form.Select>
        </FormGroup>
    )
}