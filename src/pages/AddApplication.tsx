import { useState } from "react"; // This component store state, like error messages and loading status.
import { Alert } from "react-bootstrap"; // Bootstrap UI component to show an error banner.
import { useNavigate } from "react-router-dom"; // Gives you a function to change pages programmatically.
import PageContainer from "../components/PageContainer"; // The layout wrapper
import ApplicationForm from "../components/ApplicationForm"; // Reusable form component that collects inputs and calls onSubmit.
import { createApplication } from "../api/applicationApi"; // Api function that sends a POST request to the server.
import type { ApplicationCreate } from "../types/application"; // TypeSCript type for the payload (except id).

// Functions is a page component that renders the "Add Application" screen.
export default function AddApplication() {
  const nav = useNavigate(); // Redirect function "go to this route now"
  const [err, setErr] = useState(""); // holds a current error message and updates the error message
  const [saving, setSaving] = useState(false); // tracks whether the form is currenlty submitting

  // This functions gets called by ApplicationForm when the user hits submit
  // payload is the object with form values, typed as ApplicationCreate
  async function onSubmit(payload: ApplicationCreate) {
    try {
      setErr(""); // clears any old error message before trying again
      setSaving(true); // marks "we are submitting now"
      await createApplication(payload); // sends the POST request, awaits for a response
      nav("/applications");// if create succeeds, redirect to your list page
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