/**
 * The SearchBar is a controlled input component
 */
import { Form } from "react-bootstrap";

// The parent controls the input value
// The parent controls what happens when the user types
type Props = {
    value: string;
    onChange: (next: string) => void;
};

export default function SearchBar({ value, onChange }: Props){
    return (
        <Form.Control
            placeholder="Search company, position, location..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}