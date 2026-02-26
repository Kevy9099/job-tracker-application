/**
 * The ApplicationTable component is a presentational table: it takes rows(data) and an on Delete
 * callback (an action), then renders a Bootstrap table with "veiw/edit" and "delete" buttons for each row.
 */
import { Button } from "react-bootstrap";
import { Table }from "react-bootstrap"
import { Link } from "react-router-dom";
import type { Application } from "../types/application";
import StatusBadge from "./StatusBadge";

type Props = {
  rows: Application[]; // the list of applications to display (already filtered/sorted by the parent)
  onDelete: (app: Application) => void; // A function provided by the parent (Applications page) that runs when the user clicks delete on a row
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
                <Link to={`/applications/${a.id}`} style={{ textDecoration: "none" }}>
                  <Button variant="primary" size="sm">View / Edit</Button>
                </Link>
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