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

    loadingElement?: ReactNode;
    errorElement?: ComponentType<{ message: string }>;
    notFoundElement?: ReactNode;
    emptyElement?: ReactNode;

    isEmpty?: (data: T) => boolean;
}

export const QueryBoundary = <T, >({
   isFetching,
   isUninitialized,
   error,
   data,
   children,
   loadingElement,
   errorElement: ErrorElement,
   notFoundElement,
   emptyElement,
   isEmpty,
}: QueryBoundaryProps<T>) => {
    if (isFetching) return loadingElement ?? <Spinner/>

    if (error) {
        let errorMessage = 'Something went wrong';

        if ('status' in error) {
            errorMessage = `Status: ${error.status}. Error: ${'error' in error ? error.error : JSON.stringify(error.data)}`;
        } else if ('message' in error && error.message) {
            errorMessage = error.message;
        }

        return ErrorElement ? <ErrorElement message={errorMessage}/> : <Alert variant="danger" className="text-center">{errorMessage}</Alert>
    }

    if (!data && !isUninitialized) return notFoundElement ?? <Alert variant="warning" className="text-center">Not Found</Alert>

    if (data && isEmpty?.(data) || Array.isArray(data) && !data.length) return emptyElement ?? <Alert variant="dark" className="text-center">Empty</Alert>

    return <>{children}</>;
}