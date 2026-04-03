import {z} from "zod";
import {VariantSchema} from "@t/shared.ts";

export const ToastStateSchema = z.object({
    show: z.boolean(),
    message: z.string(),
    type: VariantSchema,
});

export type ToastState = z.infer<typeof ToastStateSchema>;