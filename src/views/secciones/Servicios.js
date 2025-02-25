import React from "react";
import { Container, Row, Col } from "reactstrap";

const ServicesContent = () => {
  const services = [
    {
      title: "Bar",
      description:
        "El bar de la escuela ofrece una variedad de opciones, desde snacks y refrigerios hasta almuerzos ligeros, adaptándose a las necesidades y horarios escolares. Además, busca mantener un ambiente limpio y organizado, promoviendo hábitos de alimentación saludable y fomentando la convivencia entre la comunidad educativa.",
      image: require("assets/img/Alinambi/barAlinambi.jpg"),
      imagePosition: "left",
    },
    {
      title: "Centro médico",
      description:
        "Los servicios de nuestro centro médico abarcan la atención integral de la salud, ofreciendo consultas médicas generales y especializadas, exámenes de laboratorio, atención de emergencias, vacunación y procedimientos ambulatorios. La finalidad es brindar un servicio de calidad, accesible y eficiente, priorizando el bienestar y la seguridad de los pacientes a través de un equipo profesional y tecnología adecuada.",
      image: require("assets/img/Alinambi/fotoAlinambiDiecinueve.jpg"),
      imagePosition: "right",
    },
    {
      title: "Transporte",
      description:
        "Contamos con servicios de transporte que ofrecen soluciones de movilidad eficientes y seguras para nuestros estudiantes. Su objetivo es garantizar traslados cómodos, puntuales y confiables, optimizando rutas y recursos para brindar un servicio accesible y de calidad.",
      image: require("assets/img/Alinambi/transporte.jpg"),
      imagePosition: "left",
    },
  ];

  return (
    <div className="services-section">
      {services.map((service, index) => (
        <div key={index} className="py-5">
          <Container>
            <Row className="align-items-center">
              {service.imagePosition === "left" ? (
                <>
                  <Col md="6" className="mb-4 mb-md-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="img-fluid rounded shadow"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                    />
                  </Col>
                  <Col md="6">
                    <div className="px-4">
                      <h3
                        className="title"
                        style={{ fontWeight: "bold", color: "#2C3E50" }}
                      >
                        {service.title}
                      </h3>
                      <p
                        className="description"
                        style={{
                          fontSize: "1rem",
                          fontWeight: "400",
                          color: "#4A4A4A",
                        }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </Col>
                </>
              ) : (
                <>
                  <Col md="6" className="order-md-2 mb-4 mb-md-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="img-fluid rounded shadow"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                    />
                  </Col>
                  <Col md="6" className="order-md-1">
                    <div className="px-4">
                      <h3
                        className="title"
                        style={{ fontWeight: "bold", color: "#2C3E50" }}
                      >
                        {service.title}
                      </h3>
                      <p
                        className="description"
                        style={{
                          fontSize: "1rem",
                          fontWeight: "400",
                          color: "#4A4A4A",
                        }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </Col>
                </>
              )}
            </Row>
            {index < services.length - 1 && (
              <Row>
                <Col>
                  <hr
                    className="my-5"
                    style={{
                      borderTop: "4px solid rgba(203, 230, 130, 0.68)",
                      width: "70%",
                      margin: "3rem auto",
                    }}
                  />
                </Col>
              </Row>
            )}
          </Container>
        </div>
      ))}
    </div>
  );
};

export default ServicesContent;
