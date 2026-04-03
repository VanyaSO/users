import {Spinner as BtsSpinner} from "react-bootstrap";

export const Spinner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <BtsSpinner animation="border" size="sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </BtsSpinner>
        </div>
    );
};