export type UseQueryResult<T> = {
    data: T;
    isLoading: boolean;
    error: Error | null;
}