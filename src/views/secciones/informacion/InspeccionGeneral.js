import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
} from "reactstrap";
import axios from "axios";

const InspeccionGeneral = () => {
  const [files, setFiles] = useState([]);

  // Obtener los archivos al cargar el componente
  useEffect(() => {
    fetchFiles();
  }, []);

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

  const downloadFileByTag = async (etiqueta) => {
    try {
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

  // Datos de los elementos para cada sección
  const horariosDeClases = [
    {
      nombre: "Inicial y Preparatoria",
      etiqueta: "Horario de Clases - Inicial y Preparatoria",
    },
    {
      nombre: "Básica Elemental",
      etiqueta: "Horario de Clases - Básica Elemental",
    },
    {
      nombre: "Básica Media",
      etiqueta: "Horario de Clases - Básica Media",
    },
  ];

  const permisosYFormatos = [
    {
      nombre: "Justificación de faltas",
      etiqueta: "Formato - Justificación de faltas",
    },
    {
      nombre: "Permiso de salida",
      etiqueta: "Formato - Permiso de Salida",
    },
    {
      nombre: "Correos docentes y administrativos",
      etiqueta: "Formato - Correos",
    },
  ];

  const horariosDeAtencion = [
    {
      nombre: "Inicial y Preparatoria",
      etiqueta: "Horario de Atención - Inicial y Preparatoria",
    },
    {
      nombre: "Básica Elemental",
      etiqueta: "Horario de Atención - Básica Elemental",
    },
    {
      nombre: "Básica Media",
      etiqueta: "Horario de Atención - Básica Media",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 text-center">
      <Container>
        <Row className="justify-content-center">
          {/* Título principal */}
          <div className="text-center mb-10">
            <h2
              className="text-center"
              style={{
                fontSize: "33px",
                fontWeight: "bold",
                color: "#1E90FF",
                letterSpacing: "1.5px",
                marginBottom: "15px",
                textTransform: "uppercase",
                marginTop: "10px",
              }}
            >
              Horarios y Formatos
            </h2>
            <br />
          </div>
          <Row className="justify-content-center">
            {/* Sección HORARIOS DE CLASES */}
            <Col md="4" className="mb-2">
              <Card className="h-60">
                <CardBody
                  style={{
                    background:
                      "linear-gradient(135deg, #32CD32 0%, #98FB98 100%)",
                  }}
                >
                  <div className="text-center mb-3">
                    <CardTitle className="text-xl font-bold text-white mt-2">
                      <h3>HORARIOS DE CLASES</h3>
                    </CardTitle>
                  </div>
                </CardBody>
                <CardBody>
                  {horariosDeClases.map((item, index) => (
                    <CardText
                      key={index}
                      className="d-flex justify-content-between align-items-center mb-3 p-2 bg-gray-100 rounded"
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          downloadFileByTag(item.etiqueta);
                        }}
                        className="text-black font-medium no-underline flex-grow-1"
                        style={{ fontSize: "24px" }}
                      >
                        {item.nombre}
                      </a>
                      <FaDownload className="text-gray-500" />
                    </CardText>
                  ))}
                </CardBody>
              </Card>
            </Col>

            {/* Sección PERMISOS Y FORMATOS */}
            <Col md="4" className="mb-4">
              <Card className="h-60">
                <CardBody
                  style={{
                    background:
                      "linear-gradient(135deg, #32CD32 0%, #98FB98 100%)",
                  }}
                >
                  <div className="text-center mb-3">
                    <CardTitle className="text-xl font-bold text-white mt-2">
                      <h3>PERMISOS Y FORMATOS</h3>
                    </CardTitle>
                  </div>
                </CardBody>
                <CardBody>
                  {permisosYFormatos.map((item, index) => (
                    <CardText
                      key={index}
                      className="d-flex justify-content-between align-items-center mb-3 p-2 bg-gray-100 rounded"
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          downloadFileByTag(item.etiqueta);
                        }}
                        className="text-black font-medium no-underline flex-grow-1"
                        style={{ fontSize: "24px" }}
                      >
                        {item.nombre}
                      </a>
                      <FaDownload className="text-gray-500" />
                    </CardText>
                  ))}
                </CardBody>
              </Card>
            </Col>

            {/* Sección HORARIO DE ATENCIÓN */}
            <Col md="4" className="mb-4">
              <Card className="h-60">
                <CardBody
                  style={{
                    background:
                      "linear-gradient(135deg, #32CD32 0%, #98FB98 100%)",
                  }}
                >
                  <div className="text-center mb-3">
                    <CardTitle className="text-xl font-bold text-white mt-2">
                      <h3>HORARIOS DE ATENCIÓN</h3>
                    </CardTitle>
                  </div>
                </CardBody>
                <CardBody>
                  {horariosDeAtencion.map((item, index) => (
                    <CardText
                      key={index}
                      className="d-flex justify-content-between align-items-center mb-3 p-2 bg-gray-100 rounded"
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          downloadFileByTag(item.etiqueta);
                        }}
                        className="text-black font-medium no-underline flex-grow-1"
                        style={{ fontSize: "24px" }}
                      >
                        {item.nombre}
                      </a>
                      <FaDownload className="text-gray-500" />
                    </CardText>
                  ))}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
};

export default InspeccionGeneral;
