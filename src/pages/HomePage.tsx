import {useSearchParams} from "react-router-dom";
import {SearchBar} from "@/components/SearchBar/SearchBar.tsx";
import {PostList} from "@/components/Posts/PostList.tsx";
import {useSearchPosts} from "@/hooks/useSearchPosts.ts";

export const HomePage = () => {
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get("title_like") || undefined;
    const userIdValue = searchParams.get("userId") || undefined;

    const {fetchPosts, allUsersId, ...response} = useSearchPosts({
        search: searchValue,
        userId: userIdValue,
    });

    return (
        <div className="pt-5">
            <div className='container'>
                <div className="mb-4 d-flex gap-4 flex-wrap">
                    <SearchBar onFetch={fetchPosts}
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