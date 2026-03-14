import {useEffect, useState} from "react";
import type {Post} from "@/types/Post.ts";
import {baseUrl} from "@/config/env.ts";

export const usePost = (id: string | undefined) => {
    const [data, setData] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!id) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchPost = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const res = await fetch(`${baseUrl}/posts?id=${id}`, { signal });
                if (!res.ok) throw new Error("Something went wrong");

                const data: Post[] = await res.json();
                setData(data[0]);
            } catch (e: unknown) {
                if (e instanceof Error && e.name === 'AbortError') return;
                setError(e instanceof Error ? e : new Error("Something went wrong"));
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
        return () => controller.abort();
    }, [id]);

    return {data, isLoading, error};
}