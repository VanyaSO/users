import {useEffect, useState} from "react";
import {useDebounce} from "@/hooks/useDebounce.ts";
import Form from "react-bootstrap/esm/Form";
import {Col, Row} from "react-bootstrap";
import {Select, type SelectOption} from "@/components/ui/Form/Select.tsx";
import {Input} from "@/components/ui/Form/Input.tsx";

type PostsSearchBarProps = {
    allUsersId: SelectOption[];
    onSearchChange: (search: string) => void;
    onUserIdChange: (id: string) => void;
}

export function PostsSearchBar({ onSearchChange, onUserIdChange, allUsersId }: PostsSearchBarProps) {
    const [search, setSearch] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");
    const debouncedSearch = useDebounce<string>(search);

    useEffect(() => {
        onSearchChange(debouncedSearch);
    }, [debouncedSearch]);

    return (
        <Form>
            <Row className="g-3 align-items-center">
                <Col xs="auto">
                    <Select
                        group={{ label: "Filter by user" }}
                        options={allUsersId}
                        value={selectedUserId}
                        onChange={(e) => {
                            setSelectedUserId(e.target.value);
                            onUserIdChange(e.target.value);
                        }}
                    />
                </Col>
                <Col>
                    <Input
                        group={{ label: "Search posts" }}
                        type="text"
                        placeholder="Title post..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
            </Row>
        </Form>
    );
}