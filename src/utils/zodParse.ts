import {ZodError, ZodType} from "zod";

export const zodParse = <T>(schema: ZodType<T>, data: unknown): T => {
    try {
        return schema.parse(data);
    } catch (error) {
        if (error instanceof ZodError) {
            throw new Error(`${error.issues[0].message}`);
        }
        throw error;
    }
}