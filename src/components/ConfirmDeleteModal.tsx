/**
 * This confirmDeleteModal is a controlled, reusable confirmation dialog. it doesn't manage its own state.
 * The parent controls when it appear and what happens on confirm/cancel.
 */
import { Button, Modal } from "react-bootstrap";

type Props = {
  show: boolean; // Whather modal is visible
  onCancel: () => void; // What happens when user clicks Cancel or closes modal
  onConfirm: () => void; // What happens when user clicks Delete
  title?: string; // Optional custom title
  body?: string; // Optional custom message
};

export default function ConfirmDeleteModal({ show, onCancel, onConfirm, title, body }: Props) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Confirm Delete"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body || "Are you sure?"}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}