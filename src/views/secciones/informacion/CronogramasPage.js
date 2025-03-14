import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";
import axios from "axios";

// components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import CronogramasHeader from "components/Headers/CronogramasHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function CronogramasPage() {
  const [files, setFiles] = useState([]);

  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    fetchFiles();
  }, []);

  // Función para obtener los archivos desde la API
  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        "https://alinambiback.onrender.com/api/files"
      );
      setFiles(response.data);
    } catch (error) {
      console.error("Error al obtener archivos:", error);
      alert("Error al obtener archivos.");
    }
  };

  // Función genérica para descargar archivos por etiqueta
  const downloadFileByTag = async (etiqueta) => {
    try {
      const file = files.find((f) => f.etiqueta === etiqueta);

      if (!file) {
        alert(
          `Aún no hay archivos subidos para esta sección o no está disponible.`
        );
        return;
      }

      const response = await axios.get(
        `https://alinambiback.onrender.com/api/download/${file._id}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.filename);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(
        `Aún no hay archivos subidos para esta sección o no está disponible".`
      );
    }
  };

  const services = [
    {
      title: "Cronograma académica de la unidad educativa Aliñambi",
      description:
        "Para el régimen sierra, las clases inician los primeros días de septiembre hasta finales de junio divididos en períodos y parciales dictaminados por la ley de educación actual, para mas información puedes consultar nuestro período planificado para este año.",
      image: require("assets/img/Alinambi/ministerio-educacion.jpg"),
      imagePosition: "left",
    },
    {
      title: "Educación Personalizada",
      description:
        "Nuestro enfoque educativo se adapta a las necesidades individuales de cada estudiante, permitiendo un desarrollo integral y un aprendizaje efectivo.",
      image: require("assets/img/Alinambi/educacion-personalizada.jpg"),
      imagePosition: "left",
    },
    {
      title: "Actividades Extracurriculares",
      description:
        "Ofrecemos una amplia gama de actividades que complementan la formación académica, desarrollando habilidades adicionales en nuestros estudiantes.",
      image: require("assets/img/Alinambi/actividades-extracurriculares.jpg"),
      imagePosition: "right",
    },
  ];

  return (
    <>
      <ExamplesNavbar />
      <CronogramasHeader />
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
              Cronograma Académico
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
              El calendario sigue los protocolos y lineamientos establecidos por
              el ministerio de educación.
            </h5>
          </Col>
        </Row>
        <div className="services-section py-5">
          {services.map((service, index) => (
            <div key={index} className="service-item py-5">
              <Container>
                <Row className="align-items-center">
                  {service.imagePosition === "left" ? (
                    <>
                      <Col md="6" className="mb-4 mb-md-0">
                        <div className="image-container">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="img-fluid rounded"
                            style={{
                              width: "100%",
                              height: "400px",
                              objectFit: "cover",
                              boxShadow:
                                "0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)",
                            }}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="content-container px-4">
                          <h3
                            className="mb-4"
                            style={{
                              fontSize: "2.2rem",
                              fontWeight: "700",
                              color: "#2c2c2c",
                              borderBottom:
                                "3px solid rgba(203, 230, 130, 0.68)",
                              paddingBottom: "15px",
                            }}
                          >
                            {service.title}
                          </h3>
                          <p
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: "normal",
                              lineHeight: "1.8",
                              color: "#000",
                              textAlign: "justify",
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
                        <div className="image-container">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="img-fluid rounded"
                            style={{
                              width: "100%",
                              height: "400px",
                              objectFit: "cover",
                              boxShadow:
                                "0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)",
                            }}
                          />
                        </div>
                      </Col>
                      <Col md="6" className="order-md-1">
                        <div className="content-container px-4">
                          <h3
                            className="mb-4"
                            style={{
                              fontSize: "2.2rem",
                              fontWeight: "700",
                              color: "#2c2c2c",
                              borderBottom:
                                "3px solid rgba(203, 230, 130, 0.68)",
                              paddingBottom: "15px",
                            }}
                          >
                            {service.title}
                          </h3>
                          <p
                            style={{
                              fontSize: "1.2em",
                              fontWeight: "normal",
                              lineHeight: "1.8",
                              color: "#000",
                              textAlign: "justify",
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
                      <div
                        style={{
                          width: "70%",
                          margin: "4rem auto",
                          height: "4px",
                          background:
                            "linear-gradient(90deg, rgba(203, 230, 130, 0.2), rgba(203, 230, 130, 0.8), rgba(203, 230, 130, 0.2))",
                        }}
                      />
                    </Col>
                  </Row>
                )}
              </Container>
            </div>
          ))}
        </div>

        <Container className="mb-5">
          <Row>
            <Col md="6">
              <Card
                className="shadow-lg border-0 h-100"
                style={{
                  background: "linear-gradient(45deg, #f8f9fa, #ffffff)",
                  borderRadius: "15px",
                }}
              >
                <CardBody className="p-4">
                  <div className="d-flex align-items-center mb-4">
                    <i
                      className="nc-icon nc-calendar-60 mr-3"
                      style={{ fontSize: "2rem", color: "#51cbce" }}
                    ></i>
                    <CardTitle
                      tag="h4"
                      style={{
                        margin: "0",
                        fontWeight: "700",
                        color: "#2c2c2c",
                      }}
                    >
                      Período Académico Actual
                    </CardTitle>
                  </div>
                  <div style={{ marginTop: "50px" }}>
                    <h5
                      style={{
                        fontSize: "1.1rem",
                        color: "#666",
                      }}
                    >
                      Revisa el cronograma del período actual planificado para
                      este período.
                    </h5>
                  </div>
                  <div style={{ marginTop: "60px" }}>
                    <Button
                      className="btn-round btn-lg mt-3"
                      color="info"
                      style={{
                        width: "100%",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                      onClick={() =>
                        downloadFileByTag(
                          "Cronograma - Período Planificado Actual"
                        )
                      }
                    >
                      Ver Cronograma del Período Actual
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col md="6">
              <Card
                className="shadow-lg border-0 h-100"
                style={{
                  background: "linear-gradient(45deg, #f8f9fa, #ffffff)",
                  borderRadius: "15px",
                }}
              >
                <CardBody className="p-4">
                  <div className="d-flex align-items-center mb-4">
                    <i
                      className="nc-icon nc-watch-time mr-3"
                      style={{ fontSize: "2rem", color: "#ef8157" }}
                    ></i>
                    <CardTitle
                      tag="h4"
                      style={{
                        margin: "0",
                        fontWeight: "700",
                        color: "#2c2c2c",
                      }}
                    >
                      Vacaciones y Feriados
                    </CardTitle>
                  </div>
                  <ul
                    className="list-unstyled mb-4"
                    style={{ fontSize: "1.1rem", color: "#666" }}
                  >
                    {[
                      "Vacaciones de Navidad: 24 de diciembre - 5,6,7 de enero",
                      "Fiestas de Quito: 6 de diciembre",
                      "Vacaciones de Verano: 1 de julio - 31 de agosto",
                    ].map((item, index) => (
                      <li key={index} className="mb-3 d-flex align-items-start">
                        <i
                          className="nc-icon nc-check-2 mr-2 mt-1"
                          style={{ color: "#ef8157" }}
                        ></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="btn-round btn-lg"
                    color="danger"
                    style={{
                      width: "100%",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                    onClick={() =>
                      downloadFileByTag("Cronograma - Calendario de feriados")
                    }
                  >
                    Descargar Calendario
                  </Button>
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

export default CronogramasPage;
