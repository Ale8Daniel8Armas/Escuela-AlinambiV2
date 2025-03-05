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
} from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ValoresHeader from "components/Headers/ValoresHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function ValoresPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  return (
    <>
      <ExamplesNavbar />
      <ValoresHeader />
      <div
        className="section profile-content"
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
            <Col className="text-center" md="12">
              <h3
                className="mx-auto"
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
                Lema Aliñambi
              </h3>
              <br />
              <Card
                className="shadow-lg border-0 rounded-4"
                style={{ maxWidth: "70rem", margin: "0 auto" }}
              >
                <CardImg
                  top
                  src={require("assets/img/Alinambi/LemaAlinambi.jpeg")}
                  alt="imagen de lema de la institución"
                  className="img-fluid rounded-top-4"
                  style={{
                    height: "410px",
                    objectFit: "cover",
                    objectPosition: "center 20%",
                    width: "100%",
                  }}
                />
              </Card>
            </Col>
          </Row>
          <br />
          {/* Sección de Valores Institucionales */}
          <Row>
            <Col className="text-center" md="12">
              <h2
                className="mx-auto"
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
                Valores Institucionales
              </h2>
              <p
                className="descripcion-valores"
                style={{
                  fontSize: "22px",
                  color: "black",
                  marginTop: "30px",
                  fontWeight: "500",
                }}
              >
                En la Escuela de Educación Básica Fiscomisional Aliñambi, nos
                regimos por principios que forman ciudadanos íntegros,
                comprometidos con el bienestar común y el desarrollo de una
                sociedad justa y solidaria. Inspirados en nuestro lema,
                cultivamos los siguientes valores fundamentales:
              </p>
            </Col>
          </Row>
          <br />
          <Row className="mt-8">
            {[
              {
                title: "Solidaridad",
                text: "Fomentamos la ayuda mutua y el trabajo en equipo, promoviendo una comunidad en la que cada miembro sea consciente de las necesidades del otro y actúe con generosidad para el bien común.",
                img: require("assets/img/Alinambi/SolidaridadIcon.jpg"),
                color: "primary",
              },
              {
                title: "Justicia",
                text: "Buscamos el respeto por los derechos de todas las personas, promoviendo un ambiente en el que la equidad y la dignidad sean la base de nuestras interacciones diarias. La justicia nos guía en la toma de decisiones y en la formación de ciudadanos responsables.",
                img: require("assets/img/Alinambi/JusticiaIcon.jpg"),
                color: "success",
              },
              {
                title: "Verdad",
                text: "Creemos en la importancia de decir la verdad y vivir en coherencia con ella. La honestidad es el pilar sobre el cual construimos relaciones de confianza y credibilidad en nuestra comunidad educativa.",
                img: require("assets/img/Alinambi/VerdadIcon.jpg"),
                color: "info",
              },
              {
                title: "Amistad",
                text: "Valoramos el compañerismo y el respeto mutuo, fortaleciendo lazos de fraternidad entre estudiantes, docentes y familias. Creemos que la verdadera amistad se basa en el respeto, la lealtad y el amor al prójimo.",
                img: require("assets/img/Alinambi/AmistadIcon.jpg"),
                color: "success",
              },
            ].map((valor, index) => (
              <Col md="12" key={index}>
                <Card
                  className={`shadow-lg bg-${valor.color} text-white rounded-3`}
                  style={{
                    border: `2px solid ${valor.color}`,
                    marginBottom: "20px",
                  }}
                >
                  <CardBody>
                    <Row className="align-items-center">
                      {/* Imagen al lado izquierdo */}
                      <Col xs="3" md="2" className="text-center">
                        <img
                          src={valor.img}
                          alt={valor.title}
                          className="img-fluid rounded-circle"
                          style={{
                            maxWidth: "100px",
                            border: `2px solid ${valor.color}`,
                          }}
                        />
                      </Col>
                      {/* Texto a la derecha */}
                      <Col xs="9" md="10">
                        <CardTitle
                          tag="h5"
                          className="fw-bold"
                          style={{ fontSize: "1.25rem", fontWeight: "bold" }}
                        >
                          {valor.title}
                        </CardTitle>
                        <CardText
                          className="fw-semibold"
                          style={{
                            fontSize: "1rem",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          {valor.text}
                        </CardText>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="text-center" md="12">
              <p
                className="descripcion-valores"
                style={{
                  fontSize: "22px",
                  color: "black",
                  marginTop: "30px",
                  fontWeight: "500",
                }}
              >
                Cada uno de estos valores forma parte de nuestro compromiso con
                la educación integral, asegurando que nuestros estudiantes no
                solo adquieran conocimientos, sino que también desarrollen un
                carácter sólido y una ética de vida basada en principios
                trascendentales.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default ValoresPage;
