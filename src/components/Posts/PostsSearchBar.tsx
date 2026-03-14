import {useEffect, useState} from "react";
import {useDebounce} from "@/hooks/debounce/useDebounce.ts";
import type {FetchPostsParams} from "@/hooks/posts/usePostsSearch.ts";

type SearchBarProps = {
    onFetch: (params: FetchPostsParams) => void;
    allUsersId: number[];
    searchValue?: string;
    userIdValue?: string;
};

export function PostsSearchBar({onFetch, allUsersId, searchValue, userIdValue}: SearchBarProps) {
    const [search, setSearch] = useState<string>(searchValue ?? "");
    const [selectedUserId, setSelectedUserId] = useState<string>(userIdValue ?? "");

    const debouncedSearch = useDebounce<string>(search);

    useEffect(() => {
        onFetch({
            search: debouncedSearch || undefined,
            userId: selectedUserId || undefined,
        });
    }, [debouncedSearch, onFetch, selectedUserId]);

    return (
        <div className="search-bar d-flex gap-3">
            <div className="d-flex align-items-center">
                Filter by user:
                <select
                    className="ms-2 h-100"
                    value={selectedUserId}
                    onChange={({target}) => setSelectedUserId(target.value)}
                >
                    <option value="">All</option>
                    {allUsersId.map((id) => (
                        <option key={id} value={id}>
                            User {id}
                        </option>
                    ))}
                </select>
            </div>
            <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={({target}) => setSearch(target.value)}
            />
        </div>
    );
}