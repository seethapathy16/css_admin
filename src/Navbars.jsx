import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

function Navbars() {
    return (
        <Navbar expand="lg" bg="dark" variant="dark" className="shadow"> {/* darker theme example */}
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="fw-bold">
                    Cyber Soft Solution
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center gap-2"> {/* gap for spacing */}
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "btn btn-primary btn-sm"
                                    : "btn btn-outline-primary btn-sm"
                            }
                            end
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/courses"
                            className={({ isActive }) =>
                                isActive
                                    ? "btn btn-primary btn-sm"
                                    : "btn btn-outline-primary btn-sm"
                            }
                        >
                            Courses
                        </NavLink>

                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                isActive
                                    ? "btn btn-primary btn-sm"
                                    : "btn btn-outline-primary btn-sm"
                            }
                        >
                            Admin
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbars;