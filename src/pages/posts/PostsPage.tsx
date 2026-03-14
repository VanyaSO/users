import {useSearchParams} from "react-router-dom";
import {PostsSearchBar} from "@/components/Posts/PostsSearchBar.tsx";
import {PostList} from "@/components/Posts/PostList.tsx";
import {usePostsSearch} from "@/hooks/posts/usePostsSearch.ts";

export const PostsPage = () => {
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get("title_like") || undefined;
    const userIdValue = searchParams.get("userId") || undefined;

    const {fetchPosts, allUsersId, ...response} = usePostsSearch({
        search: searchValue,
        userId: userIdValue,
    });

    return (
        <div className="py-5">
            <div className='container'>
                <div className="mb-4 d-flex gap-4 flex-wrap">
                    <PostsSearchBar
                        onFetch={fetchPosts}
                        allUsersId={allUsersId}
                        searchValue={searchValue}
                        userIdValue={userIdValue}
                    />
                </div>

                <PostList postsResponse={response}/>
            </div>
        </div>
    );
}