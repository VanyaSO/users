import {FormGroup, type FormGroupProps} from "@/components/ui/Form/FormGroup.tsx";
import {Form, type FormControlProps} from "react-bootstrap";

type InputProps = {
    group: Omit<FormGroupProps, "children">
    as?: string;
    rows?: number;
} & FormControlProps

export const Input = ({group, ...rest}: InputProps) => {
    return (
        <FormGroup {...group}>
            <Form.Control {...rest}/>
        </FormGroup>
    )
}