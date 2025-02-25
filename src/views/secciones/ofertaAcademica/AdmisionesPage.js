import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  CardImg,
} from "reactstrap";

// components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import AdmisionesHeader from "components/Headers/AdmisionesHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function AdmisionesPage() {
  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <AdmisionesHeader />
      <div
        className="section section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/Alinambi/Wallpaper.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          paddingTop: "0",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <h2
                className="text-center"
                style={{
                  fontSize: "33px",
                  fontWeight: "bold",
                  color: "#1E90FF",
                  letterSpacing: "1.5px",
                  marginBottom: "15px",
                  textTransform: "uppercase",
                  marginTop: "35px",
                }}
              >
                Admisiones Alinambi - Proceso e Información
              </h2>
              <h5
                className="text-center description justify-content-center description"
                style={{
                  fontSize: "22px",
                  color: "black",
                  marginTop: "30px",
                  fontWeight: "500",
                }}
              >
                Bienvenidos al proceso de admisión de la Unidad Educativa
                Alinambi. Aquí encontrarás toda la información necesaria para
                formar parte de nuestra comunidad educativa.
              </h5>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md="6">
              <Card
                className="shadow-sm rounded-lg"
                style={{ overflow: "hidden" }}
              >
                <CardImg
                  alt="Inicial 2"
                  src={require("assets/img/Alinambi/fotoAlinambiTres.jpg")}
                  top
                  style={{
                    objectFit: "cover",
                    height: "250px",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                />
                <CardBody
                  style={{
                    backgroundColor: "#F98B0A",
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  <CardTitle
                    tag="h3"
                    className="text-white text-center font-weight-bold"
                    style={{ textTransform: "uppercase", fontSize: "1.6rem" }}
                  >
                    Inicial 2
                  </CardTitle>
                  <p className="text-white mb-4" style={{ fontSize: "1rem" }}>
                    Ofrecemos educación para niños de 4 años con un programa
                    integral que incluye:
                  </p>
                  <ul
                    className="text-white pl-3"
                    style={{ fontSize: "1rem", lineHeight: "1.8" }}
                  >
                    <li>Desarrollo motriz y sensorial</li>
                    <li>Iniciación a la lectoescritura</li>
                    <li>Expresión artística y musical</li>
                    <li>Desarrollo socioemocional</li>
                    <li>Inglés básico</li>
                  </ul>
                </CardBody>
              </Card>
            </Col>

            <Col md="6">
              <Card
                className="shadow-sm rounded-lg"
                style={{ overflow: "hidden" }}
              >
                <CardImg
                  alt="Educación Básica"
                  src={require("assets/img/Alinambi/fotoAlinambiCuatro.jpg")}
                  top
                  style={{
                    objectFit: "cover",
                    height: "250px",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                />
                <CardBody
                  style={{
                    backgroundColor: "#309217",
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  <CardTitle
                    tag="h3"
                    className="text-white text-center font-weight-bold"
                    style={{ textTransform: "uppercase", fontSize: "1.6rem" }}
                  >
                    Educación Básica
                  </CardTitle>
                  <p className="text-white mb-4" style={{ fontSize: "1rem" }}>
                    Formación integral para estudiantes desde primero hasta
                    séptimo grado:
                  </p>
                  <ul
                    className="text-white pl-3"
                    style={{ fontSize: "1rem", lineHeight: "1.8" }}
                  >
                    <li>Materias básicas del currículo nacional</li>
                    <li>Programa avanzado de inglés</li>
                    <li>Desarrollo de pensamiento lógico-matemático</li>
                    <li>Proyectos de investigación</li>
                    <li>Actividades deportivas y culturales</li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md="6">
              <Card
                className="shadow-lg rounded-lg"
                style={{ backgroundColor: "#F1F1F1", height: "100%" }}
              >
                <CardBody className="d-flex flex-column justify-content-between p-4">
                  <CardTitle
                    tag="h4"
                    className="text-center font-weight-bold"
                    style={{ color: "#333", fontSize: "1.4rem" }}
                  >
                    <span style={{ color: "#333" }}>
                      Proceso de Inscripción
                    </span>
                  </CardTitle>
                  <ol
                    className="text-dark"
                    style={{ fontSize: "1.1rem", lineHeight: "2" }}
                  >
                    <li>Llenar formulario de inscripción en línea</li>
                    <li>Presentar documentación requerida</li>
                    <li>Entrevista con el departamento psicológico</li>
                    <li>Evaluación diagnóstica</li>
                    <li>Entrevista con coordinación académica</li>
                    <li>Resultados de admisión</li>
                    <li>Proceso de matrícula</li>
                  </ol>
                  <Link to="/matricula-page">
                    <Button
                      className="btn-lg btn-danger d-block mx-auto mt-4"
                      style={{
                        fontWeight: "bold",
                        padding: "12px 25px",
                        fontSize: "1rem",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        borderRadius: "30px",
                      }}
                    >
                      Matrícula
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>

            <Col md="6">
              <Card
                className="shadow-lg rounded-lg"
                style={{ backgroundColor: "#F1F1F1", height: "100%" }}
              >
                <CardBody className="d-flex flex-column justify-content-between p-4">
                  <CardTitle
                    tag="h4"
                    className="text-center font-weight-bold"
                    style={{ color: "#333", fontSize: "1.4rem" }}
                  >
                    <span style={{ color: "#333" }}>
                      Documentación Requerida
                    </span>
                  </CardTitle>
                  <ul
                    className="text-dark"
                    style={{ fontSize: "1.1rem", lineHeight: "2" }}
                  >
                    <li>Partida de nacimiento</li>
                    <li>Cédula de identidad del estudiante y representantes</li>
                    <li>Certificados de promoción anteriores</li>
                    <li>Certificado de conducta</li>
                    <li>Certificado médico</li>
                    <li>4 fotografías tamaño carnet</li>
                    <li>Carnet de vacunación</li>
                  </ul>
                  <Button
                    className="btn-lg btn-success d-block mx-auto mt-4"
                    style={{
                      fontWeight: "bold",
                      padding: "12px 25px",
                      fontSize: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      borderRadius: "30px",
                    }}
                  >
                    Descargar Lista Completa
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md="12">
              <Card className="bg-dark text-white shadow-lg rounded-lg">
                <CardBody className="p-5">
                  <h3
                    className="text-center"
                    style={{ fontSize: "2rem", fontWeight: "bold" }}
                  >
                    Información de Contacto
                  </h3>
                  <Row className="mt-4">
                    <Col md="6" className="text-center">
                      <h5 className="text-white">Dirección</h5>
                      <p className="text-white">
                        Calle Panzaleo E8-203, sector Fajardo
                        <br />
                        Sangolquí - Ecuador
                      </p>
                    </Col>
                    <Col md="6" className="text-center">
                      <h5 className="text-white">Contacto</h5>
                      <p className="text-white">
                        Teléfonos: 02-2344-544
                        <br />
                        Email: alinambiuio@yahoo.com
                      </p>
                    </Col>
                  </Row>
                  <div className="text-center mt-4">
                    <Link to="/contactos-page">
                      <Button
                        className="btn-lg btn-info text-dark px-5"
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.2rem",
                          textTransform: "uppercase",
                          borderRadius: "30px",
                        }}
                      >
                        Contáctanos
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default AdmisionesPage;
