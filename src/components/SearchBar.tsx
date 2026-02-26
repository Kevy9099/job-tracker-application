import { Form } from "react-bootstrap";

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