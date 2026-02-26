import { Card } from "react-bootstrap";

type Props = {
    label: string;
    value: number | string; 
    hint?: string;
}

export default function StatCard({ label, value, hint}: Props){
    return (
        <Card className="h-100 shadow-sm">
            <Card.Body>
                <div className="text-muted small">{label}</div>
                <div className="fs-3 fw-semibold">{value}</div>
                {hint ? <div className="text-muted small mt-1">{hint}</div> : null}
            </Card.Body>
        </Card>
    );
}