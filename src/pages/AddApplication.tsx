import { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import ApplicationForm from "../components/ApplicationForm";
import { createApplication } from "../api/applicationApi";
import type { ApplicationCreate } from "../types/application";

export default function AddApplication() {
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(payload: ApplicationCreate) {
    try {
      setErr("");
      setSaving(true);
      await createApplication(payload);
      nav("/applications");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to create application");
    } finally {
      setSaving(false);
    }
  }

  return (
    <PageContainer title="Add Application">
      {err ? <Alert variant="danger">{err}</Alert> : null}
      <ApplicationForm onSubmit={onSubmit} submitLabel="Create" isSubmitting={saving} />
    </PageContainer>
  );
}