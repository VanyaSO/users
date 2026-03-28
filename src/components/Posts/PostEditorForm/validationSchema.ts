import * as Yup from 'yup';

export const validationSchema = Yup.object({
    title: Yup.string()
        .min(4, 'Title must be at least 4 characters')
        .required('Title is required'),
    body: Yup.string()
        .min(10, 'Body must be at least 10 characters')
        .max(5000, 'Body must be 5000 characters or less')
        .required('Body is required'),
});