import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";

import routes from "dashboard/src/routes.js";

function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const [searchTerm, setSearchTerm] = React.useState("");
  const sidebarToggle = React.useRef();
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Función para buscar texto en la página
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const found = window.find(searchTerm);
      if (!found) {
        alert("No se encontraron coincidencias.");
      }
    }
  };

  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };

  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };

  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };

  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });

  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

  return (
    <Navbar
      color={
        location.pathname.indexOf("full-screen-maps") !== -1 ? "dark" : color
      }
      expand="lg"
      className={
        location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand>{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <form onSubmit={handleSearch}>
            <InputGroup className="no-border">
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <InputGroupText
                onClick={handleSearch}
                style={{ cursor: "pointer" }}
              >
                <i className="nc-icon nc-zoom-split" />
              </InputGroupText>
            </InputGroup>
          </form>
          <Nav navbar>
            <NavItem>
              <Link to="/admin/panel" className="nav-link btn-magnify">
                <i
                  className="nc-icon nc-layout-11"
                  style={{ color: "black", marginLeft: "15px" }}
                />
                <p>
                  <span className="d-lg-none d-md-block">Panel</span>
                </p>
              </Link>
            </NavItem>
            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle caret nav>
                <i
                  className="nc-icon nc-bell-55"
                  style={{ color: "black", marginLeft: "15px" }}
                />
                <p>
                  <span className="d-lg-none d-md-block">Opciones</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right style={{ color: "white" }}>
                <Link to={"/admin/panel"}>
                  <DropdownItem tag="a">Panel de control</DropdownItem>
                </Link>
                <Link to={"/admin/user-page"}>
                  <DropdownItem tag="a">Lista de Usuarios</DropdownItem>
                </Link>
                <Link to={"/admin/files"}>
                  <DropdownItem tag="a">Gestión de Archivos</DropdownItem>
                </Link>
                <Link to={"/admin/members"}>
                  <DropdownItem tag="a">Consejo estudiantil</DropdownItem>
                </Link>
                <Link to={"/admin/misionVision"}>
                  <DropdownItem tag="a">Misión - Visión</DropdownItem>
                </Link>
                <Link to={"/admin/matriculaInfo"}>
                  <DropdownItem tag="a">Información de Matrículas</DropdownItem>
                </Link>
                <Link to={"/homepage"}>
                  <DropdownItem tag="a">Salir</DropdownItem>
                </Link>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
