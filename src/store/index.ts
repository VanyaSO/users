import {configureStore} from "@reduxjs/toolkit";
import {postsApi} from "@/store/api/postsApi.ts";
import {commentsApi} from "@store/api/commentsApi.ts";
import {usersApi} from "@store/api/usersApi.ts";

export default configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },

    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(postsApi.middleware, commentsApi.middleware, usersApi.middleware);
    }
})