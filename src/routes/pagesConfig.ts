import {PostsPage} from "@pages/posts/PostsPage.tsx";
import {PostDetailsPage} from "@pages/posts/PostDetailsPage.tsx";
import {PostEditorPage} from "@pages/posts/PostEditorPage.tsx";
import routerConfig from "@routes/routerConfig.ts";

export const pagesConfig = Object.freeze({
    posts: {
        path: routerConfig.postsPagePath,
        component: PostsPage
    },
    postDetails: {
        path: routerConfig.postDetailsPagePath,
        component: PostDetailsPage
    },
    postCreate: {
        path: routerConfig.postCreatePagePath,
        component: PostEditorPage
    },
    postUpdate: {
        path: routerConfig.postUpdatePagePath,
        component: PostEditorPage
    }
})