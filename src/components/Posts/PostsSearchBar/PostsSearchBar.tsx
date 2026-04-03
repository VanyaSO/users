import {useEffect, useState} from "react";
import {useDebounce} from "@hooks/useDebounce.ts";
import Form from "react-bootstrap/esm/Form";
import {Col, Row} from "react-bootstrap";
import type {PostsSearchParams} from "@t/post.ts";
import {Field} from "@components/ui/Form/Field";
import type {SelectOption} from "@t/field.ts";

type PostsSearchBarProps = {
    allUsersId: SelectOption[];
    onSearchChange: (search: string) => void;
    onUserIdChange: (id: string) => void;
    params: PostsSearchParams
}

export function PostsSearchBar({ onSearchChange, onUserIdChange, allUsersId, params }: PostsSearchBarProps) {
    const { search, userId } = params;

    const [inputSearchValue, setInputSearchValue] = useState(search ?? '');
    const debouncedSearch = useDebounce<string>(inputSearchValue);

    useEffect(() => {
        onSearchChange(debouncedSearch);
    }, [debouncedSearch, onSearchChange]);

    return (
        <Form>
            <Row className="g-3 align-items-center">
                <Col xs="auto">
                    <Field
                        group={{
                            label: "Filter by user",
                            controlId: "selectUserId",
                        }}
                        variant="select"
                        options={allUsersId}
                        value={userId ?? ""}
                        onChange={(e) => onUserIdChange(e.target.value)}
                    />
                </Col>
                <Col>
                    <Field
                        group={{
                            label: "Search posts",
                            controlId: "selectPostId",
                        }}
                        variant="input"
                        placeholder="Title post..."
                        value={inputSearchValue}
                        onChange={(e) => setInputSearchValue(e.target.value)}
                    />
                </Col>
            </Row>
        </Form>
    );
}