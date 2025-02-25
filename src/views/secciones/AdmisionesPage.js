import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";

// components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function AdmisionesPage() {
  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ExamplesNavbar />
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
              <h2 className="text-center title">Proceso de Admisiones</h2>
              <h5 className="text-center description">
                Bienvenidos al proceso de admisión de la Unidad Educativa
                Alinambi. Aquí encontrarás toda la información necesaria para
                formar parte de nuestra comunidad educativa.
              </h5>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md="4">
              <Card className="card-plain">
                <CardBody>
                  <CardTitle tag="h4">Requisitos</CardTitle>
                  <ul className="list-unstyled">
                    <li>• Partida de nacimiento</li>
                    <li>• Cédula de identidad del estudiante</li>
                    <li>• Cédula de los representantes</li>
                    <li>• Certificados de promoción anteriores</li>
                    <li>• Certificado de conducta</li>
                  </ul>
                  <Button
                    className="btn-round"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Descargar Lista Completa
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-plain">
                <CardBody>
                  <CardTitle tag="h4">Proceso</CardTitle>
                  <ol>
                    <li>Llenar formulario de inscripción</li>
                    <li>Entrevista con el departamento psicológico</li>
                    <li>Evaluación diagnóstica</li>
                    <li>Entrevista con coordinación académica</li>
                    <li>Resultados de admisión</li>
                  </ol>
                  <Button
                    className="btn-round"
                    color="success"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Iniciar Proceso
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-plain">
                <CardBody>
                  <CardTitle tag="h4">Costos y Becas</CardTitle>
                  <p>
                    Ofrecemos diferentes opciones de pago y programas de becas
                    para facilitar el acceso a una educación de calidad.
                  </p>
                  <ul className="list-unstyled">
                    <li>• Matrícula</li>
                    <li>• Pensión mensual</li>
                    <li>• Servicios complementarios</li>
                    <li>• Programa de becas</li>
                  </ul>
                  <Link to="/actividades-page">
                    <Button
                      className="btn-round"
                      color="danger"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Ver Información
                    </Button>
                  </Link>
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
