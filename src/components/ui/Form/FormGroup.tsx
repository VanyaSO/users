import Form from "react-bootstrap/esm/Form"
import { v4 as uuidv4 } from 'uuid';

export type FormGroupProps = {
    className?: string;
    label?: string;
    isTouched?: boolean;
    errors?: string;
    children: React.ReactNode,
}

export const FormGroup = ({className, label, isTouched, errors, children}: FormGroupProps) => {
    const controlId = uuidv4();

    return (
        <Form.Group className={className} controlId={controlId}>
            {label ? <Form.Label>{label}</Form.Label> : null}
            {children}
            {isTouched && errors ? (
                <Form.Text className="text-danger">{errors}</Form.Text>
            ) : null}
        </Form.Group>
    )
}