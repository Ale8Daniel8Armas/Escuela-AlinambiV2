import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";

function ExamplesNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const [quienesSomosOpen, setQuienesSomosOpen] = React.useState(false);
  const [ofertaEducativaOpen, setOfertaEducativaOpen] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [isLargeScreen, setIsLargeScreen] = React.useState(
    window.innerWidth < 1165
  );
  const [isMobileScreen, setIsMobileScreen] = React.useState(
    window.innerWidth < 767
  );

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  const toggleQuienesSomosOpen = () => {
    setQuienesSomosOpen(!quienesSomosOpen);
  };

  const toggleOfertaOpen = () => {
    setOfertaEducativaOpen(!ofertaEducativaOpen);
  };

  const toggleInfoOpen = () => {
    setInfoOpen(!infoOpen);
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth < 1165);
    };

    const handleMobileResize = () => {
      setIsMobileScreen(window.innerWidth < 767);
    };

    window.addEventListener("scroll", updateNavbarColor);
    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleMobileResize);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleMobileResize);
    };
  }, []);

  return (
    <>
      <div
        style={{
          width: "0%",
          height: "16vh",
          backgroundColor: "#000000",
        }}
      >
        <Navbar
          className={classnames("fixed-top", navbarColor)}
          color-on-scroll="300"
          expand="lg"
          style={{
            backgroundColor:
              navbarColor === "navbar-transparent" ? "transparent" : "#9CC066",
            width: "100%",
            height: "90px",
            fontFamily: "'Montserrat', sans-serif",
            position: "fixed",
            top: 0,
            transition: "all 0.3s ease",
            zIndex: 1030,
          }}
        >
          <Container
            style={{
              paddingLeft: "10px",
              maxWidth: "100%",
            }}
          >
            <Button
              aria-expanded={navbarCollapse}
              className={classnames("navbar-toggler burger-menu", {
                toggled: navbarCollapse,
              })}
              onClick={toggleNavbarCollapse}
              style={{
                display: isLargeScreen ? "block" : "none",
                border: "none",
                background: "transparent",
                padding: "5px",
              }}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </Button>
            <Collapse
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexDirection: isLargeScreen ? "column" : "row",
                ...(isMobileScreen && {
                  padding: "0",
                  backgroundColor: "#9CC066",
                }),
              }}
              navbar
              isOpen={navbarCollapse}
            >
              <Nav
                navbar
                style={{
                  flexDirection: isLargeScreen ? "column" : "row",
                  marginLeft: "auto",
                  gap: isMobileScreen ? "0" : "12px",
                  width: isMobileScreen ? "100%" : "auto",
                }}
              >
                <NavItem
                  to="/homePage"
                  target="_blank"
                  tag={Link}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginRight: "170px",
                    marginLeft: "10px",
                  }}
                >
                  <img
                    src={require("assets/img/Alinambi/LogoAlinambiT.png")}
                    alt="Logo de Empresa"
                    style={{
                      maxHeight: "65px",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "2px",
                      marginLeft: "5px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "22px",
                        fontWeight: "800",
                        color:
                          navbarColor === "navbar-transparent"
                            ? "#98FF98"
                            : "#FFFFFF",
                        lineHeight: "1.1",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      Unidad Educativa
                    </span>
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "900",
                        color: "#1A9BD5",
                        lineHeight: "1.1",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      Aliñambi
                    </span>
                  </div>
                </NavItem>
                <NavItem>
                  <UncontrolledDropdown
                    nav
                    isOpen={quienesSomosOpen}
                    toggle={toggleQuienesSomosOpen}
                  >
                    <DropdownToggle
                      nav
                      data-toggle="dropdown"
                      href="/misionYvision-page"
                      id="quienesSomosNavbarDropdownMenu"
                      style={{
                        padding: "8px 12px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "14px",
                          color: "#000000",
                          marginTop: "20px",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        <b>Quienes Somos</b>
                      </h1>
                    </DropdownToggle>
                    <DropdownMenu
                      aria-labelledby="quienesSomosNavbarDropdownMenu"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        marginBottom: isMobileScreen ? "-440px" : "-230px",
                        position: isMobileScreen ? "static" : "absolute",
                        width: isMobileScreen ? "100%" : "auto",
                        padding: isMobileScreen ? "0" : undefined,
                      }}
                    >
                      <DropdownItem
                        to="/misionYvision-page"
                        tag={Link}
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          backgroundColor: "#98FF98",
                          padding: isMobileScreen ? "8px 12px" : undefined,
                          margin: isMobileScreen ? "0" : undefined,
                          borderBottom: isMobileScreen
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                        }}
                      >
                        Mision - Vision
                      </DropdownItem>
                      <DropdownItem
                        href="/historia-page"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          backgroundColor: "#98FF98",
                          padding: isMobileScreen ? "8px 12px" : undefined,
                          margin: isMobileScreen ? "0" : undefined,
                          borderBottom: isMobileScreen
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                        }}
                      >
                        Historia
                      </DropdownItem>
                      <DropdownItem
                        href="/valores-page"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          backgroundColor: "#98FF98",
                          padding: isMobileScreen ? "8px 12px" : undefined,
                          margin: isMobileScreen ? "0" : undefined,
                          borderBottom: isMobileScreen
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                        }}
                      >
                        Valores y Compromiso
                      </DropdownItem>
                      <DropdownItem
                        href="/docentes-page"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          backgroundColor: "#98FF98",
                          padding: isMobileScreen ? "8px 12px" : undefined,
                          margin: isMobileScreen ? "0" : undefined,
                          borderBottom: isMobileScreen
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                        }}
                      >
                        Nuestro Equipo
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>
                <NavItem>
                  <UncontrolledDropdown
                    nav
                    isOpen={ofertaEducativaOpen}
                    toggle={toggleOfertaOpen}
                  >
                    <DropdownToggle
                      data-toggle="dropdown"
                      href="/admisiones-page"
                      id="ofertaEducativaNavbarDropdownMenu"
                      nav
                      style={{
                        padding: "8px 12px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "14px",
                          color: "#000000",
                          marginTop: "20px",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        <b>Oferta Educativa</b>
                      </h1>
                    </DropdownToggle>
                    <DropdownMenu
                      aria-labelledby="ofertaEducativaNavbarDropdownMenu"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        marginBottom: isMobileScreen ? "-440px" : "-270px",
                        position: isMobileScreen ? "static" : "absolute",
                        width: isMobileScreen ? "100%" : "auto",
                        padding: isMobileScreen ? "0" : undefined,
                      }}
                    >
                      <DropdownItem
                        href="/admisiones-page"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          backgroundColor: "#98FF98",
                          padding: isMobileScreen ? "8px 12px" : undefined,
                          margin: isMobileScreen ? "0" : undefined,
                          borderBottom: isMobileScreen
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                        }}
                      >
                        Admisiones
                      </DropdownItem>
                      <DropdownItem
                        href="/edInicial-page"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          backgroundColor: "#98FF98",
                          padding: isMobileScreen ? "8px 12px" : undefined,
                          margin: isMobileScreen ? "0" : undefined,
                          borderBottom: isMobileScreen
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                        }}
                      >
                        Educación Inicial
                      </DropdownItem>
                      <DropdownItem
                        href="/edBasica-page"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          backgroundColor: "#98FF98",
                          padding: isMobileScreen ? "8px 12px" : undefined,
                          margin: isMobileScreen ? "0" : undefined,
                          borderBottom: isMobileScreen
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                        }}
                      >
                        Educación Básica
                      </DropdownItem>
                      <DropdownItem
                        href="/planCurricular-page"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          backgroundColor: "#98FF98",
                          padding: isMobileScreen ? "8px 12px" : undefined,
                          margin: isMobileScreen ? "0" : undefined,
                          borderBottom: isMobileScreen
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                        }}
                      >
                        Plan Curricular
                      </DropdownItem>
                      <DropdownItem
                        href="/actividades-page"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          backgroundColor: "#98FF98",
                          padding: isMobileScreen ? "8px 12px" : undefined,
                          margin: isMobileScreen ? "0" : undefined,
                          borderBottom: isMobileScreen
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                        }}
                      >
                        Actividades
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>
                <NavItem>
                  <UncontrolledDropdown
                    nav
                    isOpen={infoOpen}
                    toggle={toggleInfoOpen}
                  >
                    <DropdownToggle
                      data-toggle="dropdown"
                      href="/convenios-page"
                      id="infoNavbarDropdownMenu"
                      nav
                      style={{
                        padding: "8px 12px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <h1
                        style={{
                          fontSize: "14px",
                          color: "#000000",
                          marginTop: "20px",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        <b>Información</b>
                      </h1>
                    </DropdownToggle>
                    <DropdownMenu
                      aria-labelledby="infoNavbarDropdownMenu"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        marginBottom: isMobileScreen ? "-440px" : "-250px",
                        position: isMobileScreen ? "static" : "absolute",
                        width: isMobileScreen ? "100%" : "auto",
                        padding: isMobileScreen ? "0" : undefined,
                      }}
                    >
                      <DropdownItem
                        href="/convenios-page"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          backgroundColor: "#98FF98",
                          padding: isMobileScreen ? "8px 12px" : undefined,
                          margin: isMobileScreen ? "0" : undefined,
                          borderBottom: isMobileScreen
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                        }}
                      >
                        Convenios
                      </DropdownItem>
                      <DropdownItem
                        href="/matricula-page"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          backgroundColor: "#98FF98",
                          padding: isMobileScreen ? "8px 12px" : undefined,
                          margin: isMobileScreen ? "0" : undefined,
                          borderBottom: isMobileScreen
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                        }}
                      >
                        Matricula
                      </DropdownItem>
                      <DropdownItem
                        href="/cronogramas-page"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          backgroundColor: "#98FF98",
                          padding: isMobileScreen ? "8px 12px" : undefined,
                          margin: isMobileScreen ? "0" : undefined,
                          borderBottom: isMobileScreen
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                        }}
                      >
                        Cronogramas
                      </DropdownItem>
                      <DropdownItem
                        href="/boletines-page"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          backgroundColor: "#98FF98",
                          padding: isMobileScreen ? "8px 12px" : undefined,
                          margin: isMobileScreen ? "0" : undefined,
                          borderBottom: isMobileScreen
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                        }}
                      >
                        Boletines
                      </DropdownItem>
                      <DropdownItem
                        href="/fundacion-page"
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          backgroundColor: "#98FF98",
                          padding: isMobileScreen ? "8px 12px" : undefined,
                          margin: isMobileScreen ? "0" : undefined,
                          borderBottom: isMobileScreen
                            ? "1px solid rgba(0,0,0,0.1)"
                            : "none",
                        }}
                      >
                        Fundación
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/servicios-page"
                    tag={Link}
                    style={{
                      padding: "8px 12px",
                      marginBottom: isMobileScreen ? "-20px" : "-20px",
                      width: isMobileScreen ? "100%" : "auto",
                    }}
                  >
                    <h6
                      style={{
                        fontSize: "14px",
                        color: "#000000",
                        marginTop: "20px",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      <b>Servicios</b>
                    </h6>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/contactos-page"
                    tag={Link}
                    style={{
                      padding: "8px 12px",
                      marginBottom: isMobileScreen ? "0" : "-20px",
                      width: isMobileScreen ? "100%" : "auto",
                    }}
                  >
                    <h6
                      style={{
                        fontSize: "14px",
                        color: "#000000",
                        marginTop: "20px",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      <b>Contactos</b>
                    </h6>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default ExamplesNavbar;
