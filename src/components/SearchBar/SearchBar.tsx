import {useEffect, useState} from "react";
import {useDebounce} from "@/hooks/useDebounce.ts";
import type {FetchPostsParams} from "@/hooks/useSearchPosts.ts";

type SearchBarProps = {
    onFetch: (params: FetchPostsParams) => void;
    allUsersId: number[];
    searchValue?: string;
    userIdValue?: string;
};

export function SearchBar({onFetch, allUsersId, searchValue, userIdValue}: SearchBarProps) {
    const [search, setSearch] = useState<string>(searchValue ?? "");
    const [selectedUserId, setSelectedUserId] = useState<string>(userIdValue ?? "");

    const debouncedSearch = useDebounce<string>(search);

    const handleUserIdChange = (value: string) => {
        setSelectedUserId(value);
        onFetch({
            search: debouncedSearch || undefined,
            userId: value || undefined,
        });
    };

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
                    onChange={({target}) => handleUserIdChange(target.value)}
                >
                    <option value="">All</option>
                    {allUsersId.map((id) => (
                        <option key={id} value={id} selected={selectedUserId === id.toString()}>
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