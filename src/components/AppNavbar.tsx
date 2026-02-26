import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function AppNavbar(){
    return(
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={NavLink} to="/"> Job Tracker </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className ="ms-auto">
                        <Nav.Link as={NavLink} to="/" end>Dashboard</Nav.Link>
                        <Nav.Link as={NavLink} to="/applications">Applications</Nav.Link>
                        <Nav.Link as={NavLink} to="/add">Add</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}