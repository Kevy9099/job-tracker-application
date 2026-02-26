import { Form } from "react-bootstrap";
import type { ApplicationStatus } from "../types/application";

const STATUSES: Array<"All" | ApplicationStatus> = ["All", "Applied", "Interview", "Offer", "Rejected"];

type Props = {
    value: "All" | ApplicationStatus;
    onChange: (next: "All" | ApplicationStatus) => void;
};

export default function StatusFilter({ value, onChange }: Props){
    return(
        <Form.Select value={value} onChange={(e) => onChange(e.target.value as Props["value"])}>
            {STATUSES.map((s) => (
                <option key={s} value={s}>
                    {s}
                </option>
            ))}
        </Form.Select>
    );
}