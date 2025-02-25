import React from "react";
import { Container, Row, Col } from "reactstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

function DemoFooter() {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: "#23294A",
        color: "white",
        padding: "2rem 0",
        fontFamily: "Montserrat, sans-serif",
        textAlign: "center",
      }}
    >
      <Container>
        <Row>
          {/* Primera columna: Dirección */}
          <Col md="4" sm="12">
            <Row
              style={{
                borderBottom: "2px solid #83A83F",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                marginBottom: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <h5
                style={{
                  color: "#4CAF50",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  textAlign: "center",
                  width: "100%",
                  marginBottom: "0",
                }}
              >
                Dirección
              </h5>
            </Row>
            <ul
              className="nc-icon-ul"
              style={{ padding: 0, listStyle: "none" }}
            >
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <i className="icon-alinambi nc-icon nc-pin-3 x2"></i>
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "1rem",
                    fontWeight: "normal",
                    marginLeft: "0.5rem",
                  }}
                >
                  Calle Panzaleo - E8-213
                </span>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <i className="icon-alinambi nc-icon nc-map-big x2"></i>
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "1rem",
                    fontWeight: "normal",
                    marginLeft: "0.5rem",
                  }}
                >
                  Conocoto - Ecuador
                </span>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <i className="icon-alinambi nc-icon nc-send x2"></i>
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "1rem",
                    fontWeight: "normal",
                    marginLeft: "0.5rem",
                  }}
                >
                  (02) 234 - 4544 / 099 542 1432
                </span>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <i className="icon-alinambi nc-icon nc-email-85 x2"></i>
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "1rem",
                    fontWeight: "normal",
                    marginLeft: "0.5rem",
                  }}
                >
                  ueefalinambi@gmail.com
                </span>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <i className="icon-alinambi nc-icon nc-globe x2"></i>
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "1rem",
                    fontWeight: "normal",
                    marginLeft: "0.5rem",
                  }}
                >
                  www.uealinambi.com
                </span>
              </li>
            </ul>
          </Col>

          {/* Segunda columna: Somos Aliñambi */}
          <Col md="4" sm="12">
            <Row
              style={{
                borderBottom: "2px solid #83A83F",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "70%",
                marginBottom: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <h5
                style={{
                  color: "#4CAF50",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  textAlign: "center",
                  width: "100%",
                  marginBottom: "0",
                }}
              >
                Somos Aliñambi
              </h5>
            </Row>
            <ul
              className="nc-icon-ul"
              style={{ padding: 0, listStyle: "none" }}
            >
              <Link
                to="/docentes-page"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <i className="icon-alinambi nc-icon nc-single-02 x2"></i>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "1rem",
                      fontWeight: "normal",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Nuestro Equipo
                  </span>
                </li>
              </Link>
              <Link
                to="/admisiones-page"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <i className="icon-alinambi nc-icon nc-hat-3 x2"></i>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "1rem",
                      fontWeight: "normal",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Admisiones
                  </span>
                </li>
              </Link>
              <Link
                to="/convenios-page"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <i className="icon-alinambi nc-icon nc-bank x2"></i>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "1rem",
                      fontWeight: "normal",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Convenios
                  </span>
                </li>
              </Link>
              <Link
                to="/matricula-page"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <i className="icon-alinambi nc-icon nc-briefcase-24 x2"></i>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "1rem",
                      fontWeight: "normal",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Matricula
                  </span>
                </li>
              </Link>
              <Link
                to="/servicios-page"
                style={{ textDecoration: "none", color: "white" }}
              >
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <i className="icon-alinambi nc-icon nc-ruler-pencil x2"></i>
                  <span
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "1rem",
                      fontWeight: "normal",
                      marginLeft: "0.5rem",
                    }}
                  >
                    Servicios
                  </span>
                </li>
              </Link>
            </ul>
          </Col>

          {/* Tercera columna: Redes Sociales */}
          <Col md="4" sm="12">
            <Row
              style={{
                borderBottom: "2px solid #83A83F",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "70%",
                marginBottom: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <h5
                style={{
                  color: "#4CAF50",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  textAlign: "center",
                  width: "100%",
                  marginBottom: "0",
                }}
              >
                Redes Sociales
              </h5>
            </Row>
            <div style={{ marginTop: "1rem" }}>
              <a
                href="https://www.facebook.com/profile.php?id=100083706603948"
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: "0 0.75rem", color: "white" }}
              >
                <i className="fab fa-facebook-square fa-2x"></i>
              </a>
              <a
                href="https://www.instagram.com/explore/locations/498223400195631/fundacion-alinambi-conocoto-ecuador/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: "0 0.75rem" }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background:
                      "linear-gradient(to right, #f58529, #dd2a7b, #8134af, #515bd4)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  <i className="fab fa-instagram fa-2x"></i>
                </span>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;
