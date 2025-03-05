import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ConveniosHeader from "components/Headers/ConveniosHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import AlianzaCarousel from "views/index-sections/alinambi-sections/AlianzasCarousel.js";

function ConveniosPage() {
  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
  }, []);

  const conveniosData = [
    {
      title: "Convenios Académicos",
      image: require("assets/img/Alinambi/convenios-academicos.jpg"),
      items: [
        "Programas de ubicación y nivelación",
        "Certificaciones especializadas",
        "Alianzas con Universidades e Intitutos de prestigio, como lo son la ESPE, PUCE o el Instituto Tecnológico Universitario Rumiñahui",
      ],
    },
    {
      title: "Convenios Deportivos",
      image: require("assets/img/Alinambi/convenios-deportivos.jpg"),
      items: [
        "Clubes deportivos locales",
        "Federaciones deportivas",
        "Escuelas de formación",
        "Eventos deportivos locales",
      ],
    },
    {
      title: "Convenios Culturales",
      image: require("assets/img/Alinambi/fotoAlinambiDoce.jpg"),
      items: [
        "Centros culturales",
        "Galerías",
        "Actividades de arte",
        "Programas de teatro",
        "Intercambios culturales",
      ],
    },
  ];

  const benefitsData = [
    {
      title: "Académicos",
      items: [
        "Acceso a recursos educativos",
        "Programas de mentoría",
        "Acercamientos con preprofesionales universitarios",
      ],
    },
    {
      title: "Deportivos",
      items: [
        "Uso de instalaciones",
        "Fomento al espíritu deportivo",
        "Participación en torneos",
      ],
    },
    {
      title: "Culturales",
      items: [
        "Talleres artísticos",
        "Eventos culturales",
        "Exposiciones y muestras",
      ],
    },
  ];

  return (
    <>
      <ExamplesNavbar />
      <ConveniosHeader />
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
                Convenios Institucionales
              </h2>
              <h5
                className="text-center justify-content-center description"
                style={{
                  fontSize: "24px",
                  color: "black",
                  marginTop: "30px",
                  fontWeight: "400",
                }}
              >
                Mantenemos alianzas estratégicas con instituciones nacionales e
                internacionales para enriquecer la experiencia educativa de
                nuestros estudiantes.
              </h5>
            </Col>
          </Row>
          <div className="px-3">
            <Row className="mt-5">
              {conveniosData.map((convenio, index) => (
                <Col md="4" key={index}>
                  <Card className="shadow-lg border-0 h-100">
                    <CardImg
                      alt={convenio.title}
                      src={convenio.image}
                      style={{
                        height: "270px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      top
                    />
                    <CardBody
                      className="d-flex flex-column"
                      style={{
                        background:
                          "linear-gradient(135deg, #32CD32 0%, #98FB98 100%)",
                        borderBottomLeftRadius: "8px",
                        borderBottomRightRadius: "8px",
                      }}
                    >
                      <CardTitle
                        tag="h4"
                        className="text-center mb-4"
                        style={{
                          fontWeight: "800",
                          color: "#343a40",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        {convenio.title}
                      </CardTitle>
                      <CardText className="flex-grow-1">
                        <ul
                          className="list-unstyled mb-0"
                          style={{
                            fontWeight: "600",
                            fontSize: "1.1rem",
                            color: "#fff",
                          }}
                        >
                          {convenio.items.map((item, i) => (
                            <li
                              key={i}
                              className="mb-3 d-flex align-items-start"
                            >
                              <i
                                className="nc-icon nc-check-2 mr-2 mt-1"
                                style={{ color: "#343a40" }}
                              ></i>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
            <br />
            <AlianzaCarousel />
            <Row className="mt-5 mb-5">
              <Col md="12">
                <Card
                  className="shadow-lg border-0"
                  style={{
                    background: "linear-gradient(45deg, #007bff, #0056b3)",
                    borderRadius: "12px",
                  }}
                >
                  <CardBody className="py-5">
                    <h3
                      className="text-white text-center mb-5"
                      style={{
                        fontWeight: "800",
                        fontSize: "2rem",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                      }}
                    >
                      Beneficios para Estudiantes
                    </h3>
                    <Row>
                      {benefitsData.map((benefit, index) => (
                        <Col md="4" key={index} className="text-center">
                          <div className="benefit-section p-3">
                            <h5
                              className="text-white mb-4"
                              style={{
                                fontWeight: "700",
                                fontSize: "1.4rem",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                              }}
                            >
                              <i className="nc-icon nc-trophy mr-2"></i>
                              {benefit.title}
                            </h5>
                            <ul
                              className="list-unstyled text-left"
                              style={{ fontSize: "1.1rem" }}
                            >
                              {benefit.items.map((item, i) => (
                                <li
                                  key={i}
                                  className="text-white mb-3 d-flex align-items-start"
                                >
                                  <i className="nc-icon nc-check-2 mr-2 mt-1"></i>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default ConveniosPage;
