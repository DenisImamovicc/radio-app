import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Link} from "react-router-dom"
import {useState} from "react"

const navbar = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false)
  return (
    <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand><Link to="/" id="linkbrand" className="p-1">SR</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/Channels"><Nav.Link href="/#" id="link" >Kanal</Nav.Link></Link>
            <Link to="/Programs"><Nav.Link href="/#" id="link">Program</Nav.Link></Link>
            {isLoggedIn ?
            (
              <Link to="/User"><Nav.Link href="/#" id="link" >Din sida</Nav.Link></Link>
            )
          :
          (
            <Link to="/Login"><Nav.Link href="/#" id="link" >Logga in</Nav.Link></Link>
          )
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default navbar;
