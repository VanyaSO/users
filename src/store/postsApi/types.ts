export type PostsParams = {
    search?: string,
    userId?: string | number
}

export type PostCreatePayload = {
    title: string,
    body: string
}

export type PostUpdatePayload = {
    id: string,
    title: string,
    body: string
}