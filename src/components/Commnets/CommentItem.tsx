import {Card} from "react-bootstrap";
import type {Comment as CommentType} from "@t/Comment.ts";

type CommentProps = {
    comment: CommentType;
}

export const CommentItem = ({comment}: CommentProps) => {
    const {name, email, body} = comment;

    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <Card.Title className="mb-1">{name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {email}
                </Card.Subtitle>
                <Card.Text style={{whiteSpace: "pre-line"}}>
                    {body}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}