import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardText,
} from "reactstrap";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DocentesHeader from "components/Headers/DocentesHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import TeamSection from "views/secciones/quienesSomos/TeamSection.js";

function DocentesPage() {
  const [docente, setDocente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener los datos del docente al cargar el componente
  useEffect(() => {
    const fetchDocente = async () => {
      try {
        const response = await axios.get(
          "https://alinambiback.onrender.com/api/teachersPic"
        );
        if (response.data.length > 0) {
          setDocente(response.data[0]);
        }
      } catch (err) {
        setError("Error al cargar los datos del docente.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocente();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!docente) {
    return <div>No hay datos del docente disponibles.</div>;
  }

  return (
    <>
      <ExamplesNavbar />
      <DocentesHeader />
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
          marginTop: "-48px",
        }}
      >
        <Container className="mt-5">
          {/* Sección Docentes*/}
          <Row>
            <Col className="text-center" xs="12">
              <h2
                className="mx-auto"
                style={{
                  fontWeight: "bold",
                  color: "#1E90FF",
                  marginBottom: "35px",
                  marginTop: "25px",
                }}
              >
                Contamos con docentes de calidad
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="12" sm="10" md="8" lg="7">
              <Card className="shadow-lg border-0 rounded-4">
                {/* Imagen en la parte superior */}
                <CardImg
                  top
                  src={`https://alinambiback.onrender.com/api/teacher-images/${docente.filename}`}
                  alt="imagen de docentes en cabecera"
                  className="img-fluid w-100"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
                <CardBody className="p-4 text-center">
                  <CardText
                    className="fw-semibold text-muted"
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                  >
                    {docente.description}{" "}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* Sección Consejo estudiantil*/}
          <TeamSection />
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default DocentesPage;
