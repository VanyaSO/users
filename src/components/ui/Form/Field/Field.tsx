import {fieldTypes} from "@components/ui/Form/fieldTypes.tsx";
import type {ReactElement} from "react";
import type {
    CheckboxFieldProps,
    InputFieldProps,
    RadioFieldProps,
    SelectFieldProps,
    TextareaFieldProps
} from "@t/field.ts";

type FieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps | CheckboxFieldProps | RadioFieldProps;

export const Field = ({variant, ...rest}: FieldProps) => {
    const Component = fieldTypes[variant] as (props: unknown) => ReactElement;

    return <Component {...rest} />
}