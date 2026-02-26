import { useEffect, useMemo, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import PageContainer from "../components/PageContainer";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import ApplicationTable from "../components/ApplicationTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ToastMessage from "../components/ToastMessage";
import { deleteApplication, getApplications } from "../api/applicationApi";
import type { Application, ApplicationStatus } from "../types/application";

export default function Applications() {
  const [apps, setApps] = useState<Application[]>([]); // The full list from the API
  const [loading, setLoading] = useState(true); // Controls the spinner
  const [err, setErr] = useState(""); // controls the error alert

  const [search, setSearch] = useState(""); // text typed into a search bar
  const [status, setStatus] = useState<"All" | ApplicationStatus>("All"); // dropdown value - either "ALL" or one of your ApplicationStatus values

  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null); // The row the user selected to delete
  const [toast, setToast] = useState({ show: false, title: "", message: "" }); // controls a little pop-up "Deleted" message


  async function load() {
    setErr("");
    setLoading(true);
    try {
      const data = await getApplications();
      setApps(data);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return apps.filter((a) => {
      const matchesSearch =
        !q ||
        [a.company, a.position, a.location].some((v) => (v || "").toLowerCase().includes(q));

      const matchesStatus =
        status === "All" || (a.status || "").toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [apps, search, status]);

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      await deleteApplication(deleteTarget.id);
      setToast({ show: true, title: "Deleted", message: "Application removed." });
      setDeleteTarget(null);
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to delete application");
      setDeleteTarget(null);
    }
  }

  return (
    <PageContainer
      title="Applications"
      right={
        <Link to="/add">
          <Button>+ Add Application</Button>
        </Link>
      }
    >
      <Row className="g-2 align-items-center mb-3">
        <Col md={8}>
          <SearchBar value={search} onChange={setSearch} />
        </Col>
        <Col md={4}>
          <StatusFilter value={status} onChange={setStatus} />
        </Col>
      </Row>

      {loading ? (
        <LoadingSpinner />
      ) : err ? (
        <Alert variant="danger">{err}</Alert>
      ) : (
        <ApplicationTable rows={filtered} onDelete={setDeleteTarget} />
      )}

      <ConfirmDeleteModal
        show={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete application?"
        body={deleteTarget ? `Delete ${deleteTarget.company} - ${deleteTarget.position}?` : ""}
      />

      <ToastMessage
        show={toast.show}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
        title={toast.title}
        message={toast.message}
      />
    </PageContainer>
  );
}