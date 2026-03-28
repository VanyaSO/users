import {createApi} from "@reduxjs/toolkit/query/react";
import {type Comment, CommentSchema} from "@t/Comment.ts";
import {zodParse} from "@utils/zodParse.ts";
import {z} from "zod";
import {baseQuery} from "@store/api/api.ts";

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery,

    endpoints: (build) => ({
        getCommentsByPostId: build.query<Comment[], string>({
            query: (postId) => ({
                url: '/comments',
                params: {
                    postId
                }
            }),
            transformResponse: (response) => zodParse(z.array(CommentSchema), response)
        })
    })
})

export const {useGetCommentsByPostIdQuery} = commentsApi;