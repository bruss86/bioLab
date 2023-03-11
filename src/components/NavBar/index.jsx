import logo from "./assets/images/logo.png";
import CartWidget from "../CartWidget";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fs-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="" width="60" height="48" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Inicio
                </a>
              </li>
              <li className="nav-item dropdown ">
                <a className="nav-link dropdown-toggle" href="#" role="button">
                  Productos
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li className="nav-item dropend">
                    <a
                      className="nav-link dropdown-toggle "
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Equipos de Laboratorio
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Agitadores y Mezcladores
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Centrífugas y Concentradores
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropend">
                    <a
                      className="nav-link dropdown-toggle "
                      href="#"
                      role="button"
                    >
                      Insumos y Consumibles
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Botellas y Bidones
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Consumibles
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Software
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contacto
                </a>
              </li>
            </ul>

            <CartWidget cantidad={0} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
