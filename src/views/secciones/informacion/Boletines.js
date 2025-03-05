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

const BoletinesContenido = () => {
  const [files, setFiles] = useState([]);

  // Obtener los archivos al cargar el componente
  useEffect(() => {
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
      // Verificar si hay un archivo con la etiqueta correspondiente
      const file = files.find((f) => f.etiqueta === etiqueta);

      if (!file) {
        alert(
          `Aún no hay archivos subidos para esta sección o no está disponible.`
        );
        return;
      }

      // Hacer una solicitud al backend para descargar el archivo
      const response = await axios.get(
        `https://alinambiback.onrender.com/api/download/${file._id}`,
        {
          responseType: "blob",
        }
      );

      // Crear un enlace temporal para la descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.filename);
      document.body.appendChild(link);
      link.click();

      // Limpiar el enlace temporal
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(
        `Aún no hay archivos subidos para esta sección o no está disponible".`
      );
    }
  };

  const bulletins = [
    {
      title: "Condición Médica",
      icon: "fa fa-medkit",
      color: "#2e8b57",
      etiqueta: "Boletín - Condición Médica",
    },
    {
      title: "Manual de Compromisos y Obligaciones",
      icon: "fa fa-book",
      color: "#2e8b57",
      etiqueta: "Boletín - Manual de Compromisos y Obligaciones",
    },
    {
      title: "Instructivo para Matrículas",
      icon: "fa fa-graduation-cap",
      color: "#2e8b57",
      etiqueta: "Boletín - Instructivo para Matrículas",
    },
    {
      title: "Resolución Ministerial de Costos",
      icon: "fa fa-heartbeat",
      color: "#2e8b57",
      etiqueta: "Boletín - Resolución Ministerial de Costos",
    },
    {
      title: "Reglamento Institucional",
      icon: "fa fa-users",
      color: "#2e8b57",
      etiqueta: "Boletín - Reglamento Institucional",
    },
    {
      title: "Carta de Solicitud",
      icon: "fa fa-file-signature",
      color: "#2e8b57",
      etiqueta: "Boletín - Carta de Solicitud",
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
                fontSize: "24px",
                color: "black",
                marginTop: "30px",
                fontWeight: "400",
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
                    onClick={() => downloadFileByTag(bulletin.etiqueta)}
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
