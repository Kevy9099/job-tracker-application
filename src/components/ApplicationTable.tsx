import Button from "react-bootstrap/Button";
import { Table }from "react-bootstrap"
import { Link } from "react-router-dom";
import type { Application } from "../types/Application";
import StatusBadge from "./StatusBadge";

type Props = {
  rows: Application[];
  onDelete: (app: Application) => void;
};

export default function ApplicationTable({ rows, onDelete }: Props) {
  return (
    <Table responsive bordered hover className="bg-white shadow-sm">
      <thead className="table-light">
        <tr>
          <th style={{ width: 90 }}>ID</th>
          <th>Company</th>
          <th>Position</th>
          <th>Status</th>
          <th>Location</th>
          <th style={{ width: 220 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center text-muted py-4">
              No applications found.
            </td>
          </tr>
        ) : (
          rows.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td className="fw-semibold">{a.company}</td>
              <td>{a.position}</td>
              <td>
                <StatusBadge status={a.status} />
              </td>
              <td>{a.location || "-"}</td>
              <td className="d-flex gap-2 flex-wrap">
                <Button variant="primary" size="sm" as={Link as any} to={`/applications/${a.id}`} >
                  View / Edit
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => onDelete(a)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}