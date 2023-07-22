import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import ProgramSearchBar from "./ProgramSearchBar";
import { useState } from "react";

interface prop {
  isLoggedIn: boolean;
  setisLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const navbar = ({ isLoggedIn, setisLoggedIn }: prop) => {
  const [userDB] = useState<any | null>(JSON.parse(localStorage.getItem("UserDB")|| "null"));
  const handleLogout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("UserDB");
    localStorage.removeItem("UserEmail");
    setisLoggedIn(false);
  };

  return (
    <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" id="linkbrand" className="p-1">
            SR
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between flex-row-reverse"
        >
          <Nav className="">
            <Link to="/Channels">
              <Nav.Link href="/#" id="link">
                Kanal
              </Nav.Link>
            </Link>
            <Link to="/Programs">
              <Nav.Link href="/#" id="link">
                Program
              </Nav.Link>
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/User">
                  <Nav.Link href="/#" id="link">
                    {userDB?.Name ? userDB.Name + " sida" : "Min sida"}
                  </Nav.Link>
                </Link>
                <Link to="/">
                  <Nav.Link href="/#" id="link" onClick={handleLogout}>
                    Logga ut
                  </Nav.Link>
                </Link>
              </>
            ) : (
              <>
                <Link to="/User">
                  <Nav.Link href="/#" id="link">
                    Min sida
                  </Nav.Link>
                </Link>
                <Link to="/Login">
                  <Nav.Link href="/#" id="link">
                    Logga in
                  </Nav.Link>
                </Link>
              </>
            )}
          </Nav>
          <ProgramSearchBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default navbar;
