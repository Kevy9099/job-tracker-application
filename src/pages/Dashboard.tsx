import { useEffect, useMemo, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import PageContainer from "../components/PageContainer";
import StatCard from "../components/StatCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { getApplications } from "../api/applicationApi";
import type { Application }  from "../types/application";

/**
 * The functions Dashboard runs one time when the Dashboard loads ([] dependency array).
 * Fetchs all applications. Updates apps, err, loading.
 */
export default function Dashboard() {
  const [apps, setApps] = useState<Application[]>([]); // List of applications from the API
  const [loading, setLoading] = useState(true); // Shows spinnger while fetching
  const [err, setErr] = useState(""); // shows an error banner if fetch fails

  useEffect(() => {
    let alive = true;// Alive is a safety guard to avoid common warning.
    (async () => {
      try {
        setErr("");
        setLoading(true);
        const data = await getApplications();
        if (!alive) return;
        setApps(data);
      } catch (e) {
        if (!alive) return;
        setErr(e instanceof Error ? e.message : "Failed to load dashboard");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const stats = useMemo(() => {
    const total = apps.length; // Number of applications
    const count = (s: string) => apps.filter((a) => (a.status || "").toLowerCase() === s).length; // Not really needed but for extra safety
    return {
      total,
      applied: count("applied"), // counts how many apps have status "Applied"
      interview: count("interview"),
      offer: count("offer"),
      rejected: count("rejected"),
    };
  }, [apps]);

  return (
    <PageContainer title="Dashboard">
      {loading ? (
        <LoadingSpinner />
      ) : err ? (
        <Alert variant="danger">{err}</Alert>
      ) : (
        <Row className="g-3">
          <Col md={3}><StatCard label="Total Applications" value={stats.total} /></Col>
          <Col md={3}><StatCard label="Applied" value={stats.applied} /></Col>
          <Col md={3}><StatCard label="Interviews" value={stats.interview} /></Col>
          <Col md={3}><StatCard label="Offers" value={stats.offer} hint="Nice!" /></Col>
          <Col md={3}><StatCard label="Rejected" value={stats.rejected} hint="Keep going." /></Col>
        </Row>
      )}
    </PageContainer>
  );
}