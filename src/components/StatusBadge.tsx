import { Badge } from "react-bootstrap";
import type { ApplicationStatus } from "../types/application";

function variantFor(status?: ApplicationStatus) {
  switch ((status || "").toLowerCase()) {
    case "applied":
      return "secondary";
    case "interview":
      return "info";
    case "offer":
      return "success";
    case "rejected":
      return "danger";
    default:
      return "dark";
  }
}

type Props = {
  status?: ApplicationStatus;
};

export default function StatusBadge({ status }: Props) {
  return <Badge bg={variantFor(status)}>{status || "Unknown"}</Badge>;
}