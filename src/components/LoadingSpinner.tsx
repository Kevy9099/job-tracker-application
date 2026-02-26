import { Spinner } from "react-bootstrap";

type Props = {label?: string};

export default function LoadingSpinner({ label = "Loading..."}: Props){
    return(
        <div className="d-flex align-items-center gap-2 text-muted">
            <Spinner animation="border" size="sm"/>
            <span>{label}</span>
        </div>
    );
}