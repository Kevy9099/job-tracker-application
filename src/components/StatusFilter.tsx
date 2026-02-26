/**
 * This StatusFilter is a controlled dropdown filter component
 */
import { Form } from "react-bootstrap";
import type { ApplicationStatus } from "../types/application";

// THis array can only contain "ALL" or valid ApplicationStatus values.
// ALso gives a complie-time safety
const STATUSES: Array<"All" | ApplicationStatus> = ["All", "Applied", "Interview", "Offer", "Rejected"];

// This makes the component: Fully controlled, Strictly typed, and impossible to pass invalid values
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