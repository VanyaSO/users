import {Button, Form, Spinner} from "react-bootstrap"
import {useFormik} from "formik";
import {Input} from "@/components/ui/Form/Input.tsx";
import type {Post} from "@/types/posts/Post.ts";
import {validationSchema} from "./validationSchema.ts";
import type {PostCreatePayload, PostUpdatePayload} from "@/store/postsApi/types.ts";

type PostEditorFormProps = {
    post?: Post;
    onSubmit: (payload: PostCreatePayload | PostUpdatePayload) => void;
    isLoading: boolean;
}

export const PostEditorForm = ({post, onSubmit, isLoading}: PostEditorFormProps) => {
    const formik = useFormik({
        initialValues: {
            title: post?.title || "",
            body: post?.body || ""
        },
        onSubmit: values => {
            onSubmit(values);
        },
        validationSchema
    });

    return (
        <Form className="w-100" onSubmit={formik.handleSubmit}>
            <Input
                group={{
                    className: "mb-3",
                    label: "Title",
                    isTouched: formik.touched.title,
                    errors: formik.errors.title
                }}
                name="title"
                type="text"
                placeholder="Title for post..."
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />

            <Input
                group={{className: "mb-3", label: "Body", isTouched: formik.touched.body, errors: formik.errors.body}}
                name="body"
                as="textarea"
                rows={7}
                placeholder="Post body..."
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{resize: "none"}}
            />

            <Button variant="primary" className="w-100" type="submit">
                {isLoading &&
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className='me-2'
                    />
                }
                Send
            </Button>
        </Form>
    )
}