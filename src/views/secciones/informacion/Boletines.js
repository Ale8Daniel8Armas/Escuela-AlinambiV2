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

const BoletinesContenido = () => {
  const bulletins = [
    {
      title: "Condición Médica",
      icon: "fa fa-medkit",
      color: "#ffd700",
      link: "#",
    },
    {
      title: "Manual de Compromisos y Obligaciones",
      icon: "fa fa-book",
      color: "#ff1493",
      link: "#",
    },
    {
      title: "Lineamientos de Becas",
      icon: "fa fa-graduation-cap",
      color: "#000080",
      link: "#",
    },
    {
      title: "Seguro Médico Estudiantil",
      icon: "fa fa-heartbeat",
      color: "#4169e1",
      link: "#",
    },
    {
      title: "Reglamento Institucional",
      icon: "fa fa-users",
      color: "#2e8b57",
      link: "#",
    },
    {
      title: "Carta de Solicitud",
      icon: "fa fa-file-signature",
      color: "#8B0000",
      link: "#",
    },
  ];

  return (
    <div className="bulletins-section py-5">
      <Container>
        <Row className="mb-4">
          <Col className="text-center">
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
              <i className="fa fa-file-text fa-2x mb-3"></i>
              <br />
              Boletines Informativos
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
              Accede a toda la información importante de nuestra institución
            </h5>
          </Col>
        </Row>
        <Row>
          {bulletins.map((bulletin, index) => (
            <Col md="4" className="mb-4" key={index}>
              <Card className="h-100 shadow-sm hover-lift">
                <CardBody className="text-center">
                  <div style={{ color: bulletin.color }} className="mb-3">
                    <i className={`${bulletin.icon} fa-2x`}></i>
                  </div>
                  <CardTitle tag="h5" className="mb-3">
                    {bulletin.title}
                  </CardTitle>
                  <Button
                    color="primary"
                    className="btn-round"
                    outline
                    href={bulletin.link}
                    target="_blank"
                    style={{
                      borderColor: bulletin.color,
                      color: bulletin.color,
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = bulletin.color;
                      e.target.style.color = "white";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = bulletin.color;
                    }}
                  >
                    <i className="fa fa-download mr-1"></i>
                    Descargar
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default BoletinesContenido;
