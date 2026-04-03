import {Button, Form, Spinner} from "react-bootstrap"
import {useFormik} from "formik";
import {validationSchema} from "./validationSchema.ts";
import type {Post, PostCreatePayload, PostUpdatePayload} from "@t/post.ts";
import {Typography} from "@components/ui/Typography";
import {Field} from "@components/ui/Form/Field";

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
            if (!!post && !formik.dirty) return;
            onSubmit(values);
        },
        validationSchema
    });

    return (
        <Form className="w-100" onSubmit={formik.handleSubmit}>
            <Field
                group={{
                    className: "mb-3",
                    label: "Title",
                    isTouched: formik.touched.title,
                    errors: formik.errors.title,
                    controlId: "titlePostId",
                }}
                variant="input"
                name="title"
                placeholder="Title for post..."
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />

            <Field
                group={{
                    className: "mb-3",
                    label: "Body",
                    isTouched: formik.touched.body,
                    errors: formik.errors.body,
                    controlId: "bodyPostId",
                }}
                variant="textarea"
                name="body"
                placeholder="Body for post..."
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={8}
                style={{resize: "none"}}
            />

            {!formik.dirty && formik.submitCount > 0 && (
                <Typography variant="p" className="text-danger">
                    Nothing has changed. Please update the fields before saving.
                </Typography>
            )}

            <Button
                variant="primary"
                className="w-100"
                type="submit"
                disabled={isLoading}
            >
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