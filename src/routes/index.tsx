import {createBrowserRouter} from 'react-router-dom';
import {PostsPage} from "@/pages/posts/PostsPage.tsx";
import {PostDetailsPage} from "@/pages/posts/PostDetailsPage.tsx";
import {Layout} from "@/components/Layout/Layout.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {index: true, element: <PostsPage/>},
            {path: "posts/:id", element: <PostDetailsPage/>}
        ]
    },
]);