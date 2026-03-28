import {
    fieldTypes,
    type InputFieldProps,
    type TextareaFieldProps,
    type SelectFieldProps,
    type CheckboxFieldProps,
    type RadioFieldProps,
} from "@components/ui/Form/fieldTypes";
import type {ReactElement} from "react";

type FieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps | CheckboxFieldProps | RadioFieldProps;

export const Field = ({variant, ...rest}: FieldProps) => {
    const Component = fieldTypes[variant] as (props: unknown) => ReactElement;

    return <Component {...rest} />
}