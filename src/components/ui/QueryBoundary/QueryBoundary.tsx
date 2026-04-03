import {Spinner} from "@components/ui/Spinner.tsx";
import {Alert} from "react-bootstrap";
import type {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import type {SerializedError} from "@reduxjs/toolkit";
import type {ComponentType, ReactNode} from "react";

export type QueryBoundaryProps<T> = {
    isFetching: boolean;
    isUninitialized: boolean;
    error?: FetchBaseQueryError | SerializedError;
    data?: T | undefined | null;
    children: ReactNode;

    loadingFallback?: ReactNode;
    errorFallback?: ComponentType<{ message: string }>;
    notFoundFallback?: ReactNode;
    emptyFallback?: ReactNode;

    isEmpty?: (data: T) => boolean;
}

export const QueryBoundary = <T, >({
   isFetching,
   isUninitialized,
   error,
   data,
   children,
   loadingFallback,
   errorFallback: ErrorFallback,
   notFoundFallback,
   emptyFallback,
   isEmpty,
}: QueryBoundaryProps<T>) => {
    if (isFetching) return loadingFallback ?? <Spinner/>

    if (error) {
        let errorMessage = 'Something went wrong';

        if ('status' in error) {
            if ('error' in error && error.error) {
                errorMessage = error.error;
            }

            if ('data' in error) {
                errorMessage = JSON.stringify(error.data);
            }

            errorMessage = `Request failed with status ${error.status}`;
        } else if ('message' in error && error.message) {
            errorMessage = error.message;
        }

        return ErrorFallback ? <ErrorFallback message={errorMessage}/> : <Alert variant="danger" className="text-center">{errorMessage}</Alert>
    }

    if (!data && !isUninitialized) return notFoundFallback ?? <Alert variant="warning" className="text-center">Not Found</Alert>

    if (data && isEmpty?.(data) || Array.isArray(data) && !data.length) return emptyFallback ?? <Alert variant="dark" className="text-center">Empty</Alert>

    return <>{children}</>;
}