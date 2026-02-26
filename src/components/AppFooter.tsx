import { Container } from "react-bootstrap";

export default function AppFooter(){
    return(
        <footer className="border-top mt-5 py-3">
            <Container className="text-muted small">
                @ {new Date().getFullYear()} Job Tracker
            </Container>
        </footer>
    )
}