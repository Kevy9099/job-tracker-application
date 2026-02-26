/**
 * Presentation component that maps your business value (ApplicationStatus) to UI styling (Bootstrap badge variants)
 */
import { Badge } from "react-bootstrap";
import type { ApplicationStatus } from "../types/application";

/**
 * @param status accepts a status & convert it to lowercase
 * @returns Returns the corresponding Bootstrap badge variant
 */
function variantFor(status?: ApplicationStatus) {
  switch ((status || "").toLowerCase()) { // prevents runtime error if status undefined.
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
  status?: ApplicationStatus; // allows safe usages
};

export default function StatusBadge({ status }: Props) {
  return <Badge bg={variantFor(status)}>{status || "Unknown"}</Badge>;
}