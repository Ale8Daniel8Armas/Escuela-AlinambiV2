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

// components

function EducacionInicialPage() {
  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className="section"
        style={{
          backgroundImage:
            "url(" + require("assets/img/Alinambi/Wallpaper.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "60vh",
          paddingTop: "0",
        }}
      >
        <Container>
          <Row className="mt-5">
            <Col md="4">
              <Card>
                <CardBody>
                  <CardTitle tag="h4">Metodología</CardTitle>
                  <CardText>
                    <ul>
                      <li>Aprendizaje basado en el juego</li>
                      <li>Desarrollo de la creatividad</li>
                      <li>Estimulación temprana</li>
                      <li>Educación personalizada</li>
                      <li>Desarrollo socioemocional</li>
                    </ul>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card>
                <CardBody>
                  <CardTitle tag="h4">Áreas de Desarrollo</CardTitle>
                  <CardText>
                    <ul>
                      <li>Desarrollo motor grueso y fino</li>
                      <li>Desarrollo del lenguaje</li>
                      <li>Desarrollo cognitivo</li>
                      <li>Desarrollo social y emocional</li>
                      <li>Expresión artística</li>
                    </ul>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card>
                <CardBody>
                  <CardTitle tag="h4">Servicios Complementarios</CardTitle>
                  <CardText>
                    <ul>
                      <li>Psicología infantil</li>
                      <li>Terapia de lenguaje</li>
                      <li>Nutrición balanceada</li>
                      <li>Actividades extracurriculares</li>
                      <li>Transporte escolar</li>
                    </ul>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md="12">
              <Card className="card-plain bg-primary">
                <CardBody>
                  <h3
                    className="text-white text-center"
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.75rem",
                      marginBottom: "2rem",
                    }}
                  >
                    Horarios y Niveles
                  </h3>
                  <Row>
                    <Col md="6">
                      <h5
                        className="text-white text-center"
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.50rem",
                          marginBottom: "1rem",
                        }}
                      >
                        Inicial 2 (4 años)
                      </h5>
                      <ul
                        className="text-white"
                        style={{ paddingLeft: "40px", fontSize: "1.05rem" }}
                      >
                        <li>Jornada matutina: 8:00 AM - 12:30 PM</li>
                        <li>Grupos reducidos</li>
                        <li>Docentes especializados</li>
                      </ul>
                    </Col>
                    <Col md="6">
                      <h5
                        className="text-white text-center"
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.50rem",
                          marginBottom: "1rem",
                        }}
                      >
                        Preparatoria (5 años)
                      </h5>
                      <ul
                        className="text-white"
                        style={{ paddingLeft: "40px", fontSize: "1.05rem" }}
                      >
                        <li>Jornada matutina: 8:00 AM - 12:30 PM</li>
                        <li>Preparación para Primaria</li>
                        <li>Actividades de integración</li>
                      </ul>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default EducacionInicialPage;
