import {createApi} from "@reduxjs/toolkit/query/react";
import {
    type GetPostsArgs,
    type GetPostsResponse,
    type Post,
    type PostCreatePayload,
    PostSchema,
    type PostUpdatePayload
} from "@t/Post";
import {z} from "zod";
import {zodParse} from "@utils/zodParse.ts";
import {baseQuery} from "@store/api/api.ts";

export const postsApi = createApi({
    reducerPath: 'postsApi',
    tagTypes: ['Posts'],
    baseQuery,

    endpoints: (build) => ({
        getPosts: build.query<GetPostsResponse, GetPostsArgs>({
            query: ({ page, search, userId}) => ({
                url: '/posts',
                params: {
                    _page: page,
                    _limit: 12,
                    ...(search && {title_like: search}),
                    ...(userId && {userId: userId}),
                }
            }),
            transformResponse: (response, meta) => {
                const posts = z.array(PostSchema).parse(response);
                const totalCount = Number(meta?.response?.headers.get("X-Total-Count") ?? 0);

                return { posts, totalCount };
            },
            providesTags: (result) => result
                ? [
                    ...result.posts.map(({id}) => ({type: 'Posts' as const, id})),
                    {type: 'Posts', id: 'LIST'}
                ]
                : [{type: 'Posts', id: 'LIST'}]
        }),

        getPostById: build.query<Post, string>({
            query: (postId) => `/posts/${postId}`,
            transformResponse: (response) => zodParse(PostSchema, response),
            providesTags: (_result, _error, id) => [{type: 'Posts', id}]
        }),

        createPost: build.mutation<Post, PostCreatePayload>({
            query: (payload) => ({
                url: 'posts',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: [{type: 'Posts', id: 'LIST'}]
        }),

        updatePost: build.mutation<Post, PostUpdatePayload>({
            query: (payload) => ({
                url: `posts/${payload.id}`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: (_result, _error, payload) => [
                {type: 'Posts', id: payload.id},
                {type: 'Posts', id: 'LIST'}
            ]
        })
    })
})


export const {useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation, useUpdatePostMutation} = postsApi;