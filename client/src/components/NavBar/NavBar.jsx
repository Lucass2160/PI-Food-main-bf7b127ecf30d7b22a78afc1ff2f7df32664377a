import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchBar from "../SearchBar/SerachBar";
import img from "../../img/tenedor.png";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img src={img} alt="logo" style={{ height: "70px" }} />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/home" className="fs-5" activeClassName="nav-active">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/create" className="fs-5" activeClassName="nav-active">
            Create
          </Nav.Link>
          <Nav.Link as={NavLink} to="/" className="fs-5" activeClassName="nav-active">
            Landing
          </Nav.Link>
        </Nav>
        <SearchBar />
      </Container>
    </Navbar>
  );
};

export default NavBar;
