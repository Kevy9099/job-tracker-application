import { useEffect, useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import PageContainer from "../components/PageContainer";
import ApplicationForm from "../components/ApplicationForm";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ToastMessage from "../components/ToastMessage";
import StatusBadge from "../components/StatusBadge";

import { deleteApplication, getApplicationById, updateApplication } from "../api/applicationApi";
import type { Application, ApplicationCreate } from "../types/application";

export default function ApplicationDetails() {
  // reads route params from this route: "/applications/:id"
  const { id } = useParams(); 
  const appId = Number(id); // Number(id) converts "42" (string) -> 42
  const nav = useNavigate();

  const [app, setApp] = useState<Application | null>(null); // the application data thats fetched 
  const [loading, setLoading] = useState(true); // shows spinner while fetching
  const [err, setErr] = useState(""); // error message string for fetch/update/detele failures

  const [saving, setSaving] = useState(false); // disables form while PATCH is in progress
  const [showDelete, setShowDelete] = useState(false); // controls whether the confirmation modal is open
  const [toast, setToast] = useState({ show: false, title: "", message: "" }); // controls the "Saved" toast popup

  /**
   * The function load(): 
   * 1. clears old errors
   * 2. turns on loading
   * 3. calls your API: GET /applications/:id
   * 4. stores response in app
   * 5. on error, sets a readable message
   * 6.always turns off loading
   */
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

  /**
   * The function useEffect: 
   * 1. Runs when the component mounts 
   * 2. Runs again if appId changes
   */
  useEffect(() => {
    // this catchs Nan, Infinity, etc.
    if (!Number.isFinite(appId)) {
      setErr("Invalid application id.");
      setLoading(false);
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId]);

  /**
   * 
   * @param payload comes from ApplicationForm, which sends PATCH /applications/:id with the form data
   * then it shows a toast to confirm success
   * then it calls load() again so the page refreshes with the lastest saved data
  */
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

  /**
   * Calls DELETE /applications/:id
   * On success: navigates back to /applications
   * always closes the modal
   */
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
        <Link to="/applications" style={{ textDecoration: "none" }}>
          <Button variant="outline-secondary">← Back</Button>
        </Link>
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