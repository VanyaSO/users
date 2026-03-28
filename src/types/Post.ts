import { z } from "zod";

export const PostSchema = z.object({
    id: z.number(),
    title: z.string(),
    body: z.string(),
    userId: z.number(),
});

export type Post = z.infer<typeof PostSchema>;


export const PostsSearchParamsSchema = z.object({
    search: z.string().optional(),
    userId: z.union([z.string(), z.number()]).optional(),
});

export type PostsSearchParams = z.infer<typeof PostsSearchParamsSchema>;

export const PostCreatePayloadSchema = z.object({
    title: z.string(),
    body: z.string(),
});

export type PostCreatePayload = z.infer<typeof PostCreatePayloadSchema>;


export const PostUpdatePayloadSchema = z.object({
    id: z.string(),
    title: z.string(),
    body: z.string(),
});

export type PostUpdatePayload = z.infer<typeof PostUpdatePayloadSchema>;


export const GetPostsArgsScheme = PostsSearchParamsSchema.extend({
    page: z.number(),
})

export type GetPostsArgs = z.infer<typeof GetPostsArgsScheme>


export const GetPostsResponseScheme = z.object({
    posts: z.array(PostSchema),
    totalCount: z.number(),
})

export type GetPostsResponse = z.infer<typeof GetPostsResponseScheme>;
