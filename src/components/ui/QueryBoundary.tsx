import {Spinner} from "@/components/ui/Spinner.tsx";
import {Alert} from "react-bootstrap";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {SerializedError} from "@reduxjs/toolkit";

type QueryBoundaryProps<T> = {
    isLoading: boolean;
    isUninitialized?: boolean;
    error?: FetchBaseQueryError | SerializedError | undefined;
    data?: T | undefined | null;
    children: (data: T) => React.ReactNode;
}

export const QueryBoundary = <T,>({isLoading, isUninitialized, error, data, children}: QueryBoundaryProps<T>) => {
    if (isUninitialized) return <>{children(data as T)}</>;

    if (isLoading) return <Spinner />

    if (error) return <Alert variant="danger">Error</Alert>

    if (!data) return <Alert variant="warning">Not Found</Alert>

    if (Array.isArray(data) && !data.length) return <Alert variant="primary">Empty</Alert>

    return <>{children(data! as T)}</>;
}