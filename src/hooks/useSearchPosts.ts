import {useState, useEffect, useCallback} from "react";
import type {Post} from "@/models/Post.ts";
import {baseUrl} from "@/config/env.ts";
import {useNavigate} from "react-router-dom";

export type FetchPostsParams = {
    search?: string;
    userId?: string;
};

export const useSearchPosts = ({search, userId}: FetchPostsParams) => {
    const [data, setData] = useState<Post[]>([]);
    const [allUsersId, setAllUsersId] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllUsersId = async () => {
            try {
                const res = await fetch(`${baseUrl}/posts`);
                if (!res.ok) throw new Error("Something went wrong");

                const data: Post[] = await res.json();

                setAllUsersId(
                    Array.from(new Set(data.map((p) => p.userId))).sort(
                        (a, b) => a - b));

                if (!search && !userId) {
                    setData(data);
                    return;
                }

                const filteredPosts: Post[] = data.filter((post: Post) => {
                    const matchesSearch = !search || post.title.toLowerCase().includes(search.toLowerCase());
                    const matchesUserId = !userId || post.userId === Number(userId);

                    return matchesSearch && matchesUserId;
                });

                setData(filteredPosts);
            } catch (e: unknown) {
                setError(e instanceof Error ? e : new Error("Something went wrong"));
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllUsersId();
    }, []);

    const fetchPosts = useCallback(async ({search, userId}: FetchPostsParams = {}) => {
        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();

            if (userId) {
                params.set("userId", userId);
            } else {
                params.delete("userId");
            }

            if (search) {
                params.set("title_like", search);
            } else {
                params.delete("title_like");
            }

            const res = await fetch(`${baseUrl}/posts?${params.toString()}`);
            if (!res.ok) throw new Error("Something went wrong");

            const data: Post[] = await res.json();
            setData(data);

            const paramsString = params.toString();
            navigate(paramsString ? `?${paramsString}` : '/', {replace: true})
        } catch (e: unknown) {
            setError(e instanceof Error ? e : new Error("Something went wrong"));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {data, allUsersId, isLoading, error, fetchPosts};
};