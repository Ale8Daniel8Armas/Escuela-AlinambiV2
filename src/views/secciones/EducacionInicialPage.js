import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

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
            "url(" + require("assets/img/Alinambi/wallpaperTwo.jpeg") + ")",
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
              <Card
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: "20px",
                }}
              >
                <CardBody>
                  <CardTitle
                    tag="h4"
                    style={{ color: "#333", marginBottom: "20px" }}
                  >
                    Metodología
                  </CardTitle>
                  <CardText>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                      <li style={{ marginBottom: "10px", color: "#555" }}>
                        Aprendizaje basado en el juego
                      </li>
                      <li style={{ marginBottom: "10px", color: "#555" }}>
                        Desarrollo de la creatividad
                      </li>
                      <li style={{ marginBottom: "10px", color: "#555" }}>
                        Estimulación temprana
                      </li>
                      <li style={{ marginBottom: "10px", color: "#555" }}>
                        Educación personalizada
                      </li>
                      <li style={{ marginBottom: "10px", color: "#555" }}>
                        Desarrollo socioemocional
                      </li>
                    </ul>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: "20px",
                }}
              >
                <CardBody>
                  <CardTitle
                    tag="h4"
                    style={{ color: "#333", marginBottom: "20px" }}
                  >
                    Áreas de Desarrollo
                  </CardTitle>
                  <CardText>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                      <li style={{ marginBottom: "10px", color: "#555" }}>
                        Desarrollo motor grueso y fino
                      </li>
                      <li style={{ marginBottom: "10px", color: "#555" }}>
                        Desarrollo del lenguaje
                      </li>
                      <li style={{ marginBottom: "10px", color: "#555" }}>
                        Desarrollo cognitivo
                      </li>
                      <li style={{ marginBottom: "10px", color: "#555" }}>
                        Desarrollo social y emocional
                      </li>
                      <li style={{ marginBottom: "10px", color: "#555" }}>
                        Expresión artística
                      </li>
                    </ul>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: "20px",
                }}
              >
                <CardBody>
                  <CardTitle
                    tag="h4"
                    style={{ color: "#333", marginBottom: "20px" }}
                  >
                    Servicios Complementarios
                  </CardTitle>
                  <CardText>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                      <li style={{ marginBottom: "10px", color: "#555" }}>
                        Psicología infantil
                      </li>
                      <li style={{ marginBottom: "10px", color: "#555" }}>
                        Terapia de lenguaje
                      </li>
                      <li style={{ marginBottom: "10px", color: "#555" }}>
                        Nutrición balanceada
                      </li>
                      <li style={{ marginBottom: "10px", color: "#555" }}>
                        Actividades extracurriculares
                      </li>
                    </ul>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md="12">
              <Card
                className="card-plain"
                style={{ backgroundColor: "#1E9FDB" }}
              >
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
                        style={{
                          paddingLeft: "40px",
                          fontSize: "1.05rem",
                          marginLeft: "25px",
                        }}
                      >
                        <li>Jornada matutina: 7:00 AM - 12:00 PM</li>
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
                        style={{
                          paddingLeft: "40px",
                          fontSize: "1.05rem",
                          marginLeft: "25px",
                        }}
                      >
                        <li>Jornada matutina: 7:00 AM - 12:00PM</li>
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
