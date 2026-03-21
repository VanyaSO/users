import {Spinner as BtsSpinner} from "react-bootstrap";

type SpinnerProps = {
    size?: "sm" | undefined;
};

export const Spinner = ({size}: SpinnerProps) => {
    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <BtsSpinner animation="border" size={size} role="status">
                <span className="visually-hidden">Loading...</span>
            </BtsSpinner>
        </div>
    );
};