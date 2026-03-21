export const postsPagePath = '/';
export const postDetailsPagePath = '/posts/:id';
export const postCreatePagePath = '/posts/create';
export const postUpdatePagePath = '/posts/update/:id';

export const getPostDetailsPath = (id: number | string) => `/posts/${id}`;
export const getPostUpdatePath = (id: number | string) => `/posts/update/${id}`;

export default Object.freeze({
    postsPagePath,
    postDetailsPagePath,
    postCreatePagePath,
    postUpdatePagePath,
    getPostDetailsPath,
    getPostUpdatePath,
})