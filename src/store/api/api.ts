import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "@config/env.ts";

export const baseQuery = fetchBaseQuery({
    baseUrl,
})