import { useEffect, useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import PageContainer from "../components/PageContainer";
import ApplicationForm from "../components/ApplicationForm";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ToastMessage from "../components/ToastMessage";
import StatusBadge from "../components/StatusBadge";

import { deleteApplication, getApplicationById, updateApplication } from "../api/applicationApi";
import type { Application, ApplicationCreate } from "../types/Application";

export default function ApplicationDetails() {
  const { id } = useParams();
  const appId = Number(id);
  const nav = useNavigate();

  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [toast, setToast] = useState({ show: false, title: "", message: "" });

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const data = await getApplicationById(appId);
      setApp(data);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load application");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!Number.isFinite(appId)) {
      setErr("Invalid application id.");
      setLoading(false);
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId]);

  async function onSubmit(payload: ApplicationCreate) {
    try {
      setErr("");
      setSaving(true);
      await updateApplication(appId, payload);
      setToast({ show: true, title: "Saved", message: "Application updated." });
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to update application");
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    try {
      await deleteApplication(appId);
      nav("/applications");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to delete application");
    } finally {
      setShowDelete(false);
    }
  }

  return (
    <PageContainer
      title="Application Details"
      right={
        <Button as={Link as any} to="/applications" variant="outline-secondary">
          ← Back
        </Button>
      }
    >
      {loading ? (
        <LoadingSpinner />
      ) : err ? (
        <Alert variant="danger">{err}</Alert>
      ) : !app ? (
        <Alert variant="warning">Application not found.</Alert>
      ) : (
        <>
          <Card className="mb-3 shadow-sm">
            <Card.Body className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
              <div>
                <div className="h5 mb-1">
                  {app.company} — {app.position}
                </div>
                <div className="text-muted small">
                  Location: {app.location || "-"} • Applied: {app.dateApplied || "-"}
                </div>
                <div className="mt-2">
                  <StatusBadge status={app.status} />
                </div>
              </div>

              <div className="d-flex gap-2">
                <Button variant="outline-danger" onClick={() => setShowDelete(true)}>
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>

          <ApplicationForm
            initialValues={{
              company: app.company,
              position: app.position,
              status: app.status,
              location: app.location || "",
              dateApplied: app.dateApplied || "",
              link: app.link || "",
              notes: app.notes || "",
            }}
            onSubmit={onSubmit}
            submitLabel="Update"
            isSubmitting={saving}
          />
        </>
      )}

      <ConfirmDeleteModal
        show={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={confirmDelete}
        title="Delete application?"
        body="This action cannot be undone."
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