import Form from "react-bootstrap/esm/Form"

export type FormGroupProps = {
    className?: string;
    label?: string;
    isTouched?: boolean;
    errors?: string;
    controlId: string;
    children: React.ReactNode,
}

export const FormGroup = ({className, label, isTouched, errors, children, controlId}: FormGroupProps) => {
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