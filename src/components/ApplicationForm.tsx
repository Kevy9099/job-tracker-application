import { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import type { ApplicationCreate, ApplicationStatus } from "../types/Application";

const STATUSES: ApplicationStatus[] = ["Applied", "Interview", "Offer", "Rejected"];

type Props = {
  initialValues?: ApplicationCreate;
  onSubmit: (payload: ApplicationCreate) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
};

type Touched = Partial<Record<keyof ApplicationCreate, boolean>>;

export default function ApplicationForm({
  initialValues,
  onSubmit,
  submitLabel = "Save",
  isSubmitting = false,
}: Props) {
  const defaults: ApplicationCreate = {
    company: "",
    position: "",
    status: "Applied",
    location: "",
    dateApplied: "",
    link: "",
    notes: "",
  };

  const [form, setForm] = useState<ApplicationCreate>(initialValues ?? defaults);
  const [touched, setTouched] = useState<Touched>({});

  useEffect(() => {
    setForm(initialValues ?? defaults);
  }, [initialValues]);

  function setField<K extends keyof ApplicationCreate>(name: K, value: ApplicationCreate[K]) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const errors = useMemo(() => {
    return {
      company: form.company.trim() ? "" : "Company is required.",
      position: form.position.trim() ? "" : "Position is required.",
    };
  }, [form.company, form.position]);

  const isValid = !errors.company && !errors.position;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ company: true, position: true });

    if (!isValid) return;

    const payload: ApplicationCreate = {
      ...form,
      company: form.company.trim(),
      position: form.position.trim(),
      location: (form.location || "").trim(),
      link: (form.link || "").trim(),
      notes: (form.notes || "").trim(),
      dateApplied: form.dateApplied || "",
    };

    onSubmit(payload);
  }

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Label>Company *</Form.Label>
              <Form.Control
                value={form.company}
                onChange={(e) => setField("company", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, company: true }))}
                isInvalid={!!touched.company && !!errors.company}
                placeholder="e.g., Google"
              />
              <Form.Control.Feedback type="invalid">{errors.company}</Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Label>Position *</Form.Label>
              <Form.Control
                value={form.position}
                onChange={(e) => setField("position", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, position: true }))}
                isInvalid={!!touched.position && !!errors.position}
                placeholder="e.g., Frontend Developer"
              />
              <Form.Control.Feedback type="invalid">{errors.position}</Form.Control.Feedback>
            </Col>

            <Col md={4}>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={form.status}
                onChange={(e) => setField("status", e.target.value as ApplicationStatus)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={4}>
              <Form.Label>Location</Form.Label>
              <Form.Control
                value={form.location || ""}
                onChange={(e) => setField("location", e.target.value)}
                placeholder="Remote / City, ST"
              />
            </Col>

            <Col md={4}>
              <Form.Label>Date Applied</Form.Label>
              <Form.Control
                type="date"
                value={form.dateApplied || ""}
                onChange={(e) => setField("dateApplied", e.target.value)}
              />
            </Col>

            <Col md={12}>
              <Form.Label>Job Link</Form.Label>
              <Form.Control
                value={form.link || ""}
                onChange={(e) => setField("link", e.target.value)}
                placeholder="https://..."
              />
            </Col>

            <Col md={12}>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={form.notes || ""}
                onChange={(e) => setField("notes", e.target.value)}
                placeholder="Anything important about this application..."
              />
            </Col>

            <Col md={12} className="d-flex gap-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting ? "Saving..." : submitLabel}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}