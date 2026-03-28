import {z} from "zod";

export const CommentSchema = z.object({
    postId: z.number(),
    id: z.number(),
    name: z.string(),
    email: z.email(),
    body: z.string()
})

export type Comment = z.infer<typeof CommentSchema>;