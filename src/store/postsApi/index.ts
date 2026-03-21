import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "@/config/env.ts";
import type {Post} from "@/types/posts/Post.ts";
import type {PostCreatePayload, PostsParams, PostUpdatePayload} from "@/store/postsApi/types.ts";

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),

    endpoints: (build) => ({
        getPosts: build.query<Post[], PostsParams>({
            query: ({ search, userId }: PostsParams) => ({
                url: '/posts',
                params: {
                    title_like: search,
                    userId: userId
                }
            })
        }),

        getPostById: build.query({
            query: (postId: string) => `/posts/${postId}`
        }),

        createPost: build.mutation({
            query: (payload: PostCreatePayload) => ({
                url: 'posts',
                method: 'POST',
                body: payload
            })
        }),

        updatePost: build.mutation({
            query: (payload: PostUpdatePayload) => ({
                url: `posts/${payload.id}`,
                method: 'PUT',
                body: payload
            })
        })
    })
})


export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation, useUpdatePostMutation } = postsApi;