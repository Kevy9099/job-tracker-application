/**
 * This ToastMessage is a reusable notification component. It's fully controlled by the parent and uses Bootstrap's built-in toast behavior correctly.
 */
import {Toast, ToastContainer } from "react-bootstrap";

type Props = {
    show: boolean; // controls visibility
    onClose: () => void; // Runs when toast closes
    title: string; // Header text
    message: string; // Body content
};

export default function ToastMessage({ show, onClose, title, message}: Props){
    return(
    <ToastContainer position="bottom-end" className="p-3">
        <Toast show={show} onClose={onClose} delay={2500} autohide>
            <Toast.Header closeButton>
                <strong className="me-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    </ToastContainer>
    )
}