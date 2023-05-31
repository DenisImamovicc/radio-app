import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom"

const navbar = () => {
  return (
    <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand><Link to="/" id="linkbrand" className="p-1">SR</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/Channels"><Nav.Link href="/#" id="link" >Kanal</Nav.Link></Link>
            <Link to="/Programs"><Nav.Link href="/#" id="link">Program</Nav.Link></Link>
            {/* <Link to="/Favorites"><Nav.Link href="/#" id="link" >Favorites</Nav.Link></Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default navbar;
