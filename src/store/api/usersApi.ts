import {createApi} from "@reduxjs/toolkit/query/react";
import {zodParse} from "@utils/zodParse.ts";
import {z} from "zod";
import {baseQuery} from "@store/api/api.ts";
import {type User, UserSchema} from "@t/user.ts";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    tagTypes: ['Users'],
    baseQuery,

    endpoints: (build) => ({
        getUsers: build.query<User[], void>({
            query: () => ({
                url: '/users',
            }),
            transformResponse: (response) => zodParse(z.array(UserSchema), response)
        })
    })
})

export const {useGetUsersQuery} = usersApi;