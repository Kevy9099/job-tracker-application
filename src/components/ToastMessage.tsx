import {Toast, ToastContainer } from "react-bootstrap";

type Props = {
    show: boolean;
    onClose: () => void;
    title: string;
    message: string;
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