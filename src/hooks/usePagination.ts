import {useSearchParams} from "react-router";

export const usePagination = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("_page")) || 1;

    const onPageChange = (newPage: number) => {
        setSearchParams(prev => {
            if (newPage > 1) {
                prev.set("_page", String(newPage));
            } else {
                prev.delete("_page")
            }

            return prev;
        })
    }

    return { page, onPageChange };
}