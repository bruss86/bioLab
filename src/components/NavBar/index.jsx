import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import CartWidget from "../CartWidget";
import Logo from "./assets/images/icono32.png";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="LOGO"
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {"  "}
            BIOLAB
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Inicio</Nav.Link>

              <NavDropdown
                title="Productos"
                id="basic-nav-dropdown"
                menuVariant="dark" //color del menu desplegable secundario
                drop="down" // "end" para ir a la derecha
              >
                <NavDropdown
                  title="Insumos y consumibles"
                  id="basic-nav-dropdown"
                  menuVariant="dark" //color del menu desplegable secundario
                  drop="end" // "end" para ir a la derecha
                >
                  <NavDropdown.Item href="/category/botellas_y_bidones">
                    Botellas y Bidones
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/category/descartables">
                    Descartables
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Equipos de Laboratorio"
                  id="basic-nav-dropdown"
                  menuVariant="dark" //color del menu desplegable secundario
                  drop="end" // "end" para ir a la derecha
                >
                  <NavDropdown.Item href="/category/agitadores_y_mezcladores">
                    Agitadores y Mezcladores
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/category/centrifugas_y_concentradores">
                    Centrífugas y Concentradores
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown.Item href="/category/software">
                  Software
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/contact">Contacto</Nav.Link>
            </Nav>
            <Nav>
              <CartWidget cantidad={0} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
