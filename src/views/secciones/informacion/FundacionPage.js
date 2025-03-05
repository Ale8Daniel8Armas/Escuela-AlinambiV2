import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Button,
} from "reactstrap";

// components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import FundacionHeader from "components/Headers/FundacionHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function FundacionPage() {
  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <FundacionHeader />
      <div
        className="section"
        style={{
          backgroundImage:
            "url(" + require("assets/img/Alinambi/wallpaperTwo.jpeg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          paddingTop: "0",
        }}
      >
        <Container>
          <Row className="justify-content-center text-center">
            <Col md="10">
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
                <i className="fas fa-hands-helping me-2"></i>
                Somos parte de la fundación Aliñambi
              </h2>
              <h5
                className="text-center description justify-content-center description"
                style={{
                  fontSize: "24px",
                  color: "black",
                  marginTop: "30px",
                  fontWeight: "400",
                }}
              >
                Aliñambi es una institución que busca fortalecer la educación
                general básica en la comunidad de Alinambi, de manera que todos
                los niños y niñas puedan desarrollar habilidades y valores
                necesarios para el siglo XXI.
              </h5>
              <div className="mt-4">
                <Button
                  className="btn-round btn-lg"
                  color="primary"
                  href="https://lorenzojumbo.wixsite.com/fualinambi/nosotros"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-external-link-alt me-2"></i>
                  Visitar Fundación Alinambi
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="mt-5 g-4">
            <Col md="6">
              <Card className="shadow-lg border-0">
                <CardImg
                  alt="Historia"
                  src={require("assets/img/Alinambi/fotoAlinambiVeinte.jpg")}
                  top
                />
                <CardBody>
                  <CardTitle tag="h4" className="text-primary">
                    <i className="fas fa-book me-2"></i>
                    Fundación y Trayectoria
                  </CardTitle>
                  <br />
                  <CardText>
                    La fundación Aliñambi fue creada con el propósito de brindar
                    una educación integral y de calidad a la comunidad y ofrecer
                    acceso a la educación a niños afectados o marginados.
                    <ul>
                      <li>Fundación: 1993</li>
                      <li>Acreditación y reconocimiento: 2005</li>
                      <li>Renovación infraestructura: 2016</li>
                    </ul>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className="shadow-lg border-0">
                <CardImg
                  alt="Valores"
                  src={require("assets/img/Alinambi/fotoAlinambiUno.jpg")}
                  top
                />
                <CardBody>
                  <CardTitle tag="h4" className="text-primary">
                    <i className="fas fa-star me-2"></i>
                    Objetivo General
                  </CardTitle>
                  <br />
                  <CardText>
                    Llevar un programa de reinserción social con hijos de padres
                    privados de libertad de las cárceles de Pichincha, hijos de
                    drogadictos y otros niños cuyos derechos han sido
                    vulnerados.
                    <br />
                    <ul>
                      <li>
                        Se realizan talleres de agricultura y panadería para que
                        se integren en un futuro al mercado laboral siguiendo un
                        plan de desarrollo especializado y curricular
                        planificado.
                      </li>
                    </ul>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5 g-4">
            <Col md="4">
              <Card className="shadow border-0 bg-info text-light-emphasis text-center d-flex flex-column h-100 p-4">
                <CardBody className="flex-grow-1 d-flex flex-column justify-content-between">
                  <CardTitle
                    tag="h4"
                    className="mb-3 text-light-emphasis text-white"
                  >
                    <i className="fas fa-bullseye fa-lg me-2"></i>
                    Misión
                  </CardTitle>
                  <CardText className="opacity-75 text-white">
                    Formar estudiantes integrales con excelencia académica,
                    valores sólidos y compromiso social.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="shadow border-0 bg-info text-light-emphasis text-center d-flex flex-column h-100 p-4">
                <CardBody className="flex-grow-1 d-flex flex-column justify-content-between">
                  <CardTitle
                    tag="h4"
                    className="mb-3 text-light-emphasis text-white"
                  >
                    <i className="fas fa-eye fa-lg me-2"></i>
                    Visión
                  </CardTitle>
                  <CardText className="opacity-75 text-white">
                    Ser reconocidos como una institución líder en innovación
                    pedagógica y formación integral.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="shadow border-0 bg-info text-light-emphasis d-flex flex-column h-100 p-4">
                <CardBody className="flex-grow-1 d-flex flex-column justify-content-between">
                  <CardTitle
                    tag="h4"
                    className="mb-3 text-light-emphasis text-white"
                  >
                    <i className="fas fa-clipboard-list fa-lg me-2"></i>
                    Objetivos
                  </CardTitle>
                  <CardText className="opacity-75 text-white">
                    <ul className="list-unstyled mb-0">
                      <li>
                        <i className="fas fa-check-circle me-2"></i> Devolver a
                        los niños sus derechos.
                      </li>
                      <li>
                        <i className="fas fa-check-circle me-2"></i> Educar a
                        niños y jóvenes para integrarlos a la sociedad.
                      </li>
                    </ul>
                  </CardText>
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

export default FundacionPage;
