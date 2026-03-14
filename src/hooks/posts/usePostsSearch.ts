import {useState, useEffect, useCallback, useRef} from "react";
import type {Post} from "@/types/Post.ts";
import {baseUrl} from "@/config/env.ts";
import {useNavigate} from "react-router-dom";

export type FetchPostsParams = {
    search?: string;
    userId?: string;
};

export const usePostsSearch = ({search, userId}: FetchPostsParams = {}) => {
    const [data, setData] = useState<Post[]>([]);
    const [allUsersId, setAllUsersId] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const navigate = useNavigate();

    const fetchPostsAbortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchAllUsersId = async () => {
            setIsLoading(true);

            try {
                const res = await fetch(`${baseUrl}/posts`, { signal });
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
                if (e instanceof Error && e.name === 'AbortError') return;
                setError(e instanceof Error ? e : new Error("Something went wrong"));
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllUsersId();
        return () => controller.abort();
    }, []);

    const fetchPosts = useCallback(async ({search, userId}: FetchPostsParams = {}) => {
        if (fetchPostsAbortControllerRef.current) {
            fetchPostsAbortControllerRef.current.abort();
        }

        const controller = new AbortController();
        fetchPostsAbortControllerRef.current = controller;
        const signal = controller.signal;

        try {
            setIsLoading(true);
            setError(null);

            const params = new URLSearchParams();

            if (userId) params.set("userId", userId);
            if (search) params.set("title_like", search);

            const res = await fetch(`${baseUrl}/posts?${params.toString()}`, { signal });
            if (!res.ok) throw new Error("Something went wrong");

            const data: Post[] = await res.json();
            setData(data);

            const paramsString = params.toString();
            navigate(paramsString ? `?${paramsString}` : '/', {replace: true})
        } catch (e: unknown) {
            if (e instanceof Error && e.name === 'AbortError') return;
            setError(e instanceof Error ? e : new Error("Something went wrong"));
        } finally {
            setIsLoading(false);
            fetchPostsAbortControllerRef.current = null;
        }
    }, [navigate]);

    return {data, allUsersId, isLoading, error, fetchPosts};
};