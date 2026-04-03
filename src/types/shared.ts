import { z } from "zod";

export const VariantSchema = z.enum([
    'primary', 'secondary', 'success',
    'danger', 'warning', 'info', 'dark', 'light'
]);

export type Variant = z.infer<typeof VariantSchema>;

export type OmitVariant<T> = Omit<T, "variant">;
export type OmitChildren<T> = Omit<T, 'children'>;