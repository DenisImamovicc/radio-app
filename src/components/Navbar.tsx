import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom"

const navbar = () => {
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand><Link to="/">SR</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/Channels">Channels</Link>
            <Link to="/Programs">Programs</Link>
            <Link to="/Favorites">Favorites</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default navbar;
