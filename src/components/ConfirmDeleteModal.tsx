import { Button, Modal } from "react-bootstrap";

type Props = {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  body?: string;
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