import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

import axios from "axios";

const EnrollmentDashboard = () => {
  const [files, setFiles] = useState([]);
  const [initialEducationInfo, setInitialEducationInfo] = useState(null);
  const [basicEducationInfo, setBasicEducationInfo] = useState(null);

  useEffect(() => {
    fetchFiles();
    fetchMatriculaInfo();
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
    }
  };

  // Función para obtener la información de matrícula desde la API
  const fetchMatriculaInfo = async () => {
    try {
      // Obtener información de matrícula para educación inicial
      const initialResponse = await axios.get(
        "https://alinambiback.onrender.com/api/matricula/inicial"
      );
      setInitialEducationInfo(initialResponse.data);

      // Obtener información de matrícula para educación básica
      const basicResponse = await axios.get(
        "https://alinambiback.onrender.com/api/matricula/basica"
      );
      setBasicEducationInfo(basicResponse.data);
    } catch (error) {
      console.error("Error al obtener información de matrícula:", error);
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
        `Aún no hay archivos subidos para esta sección o no está disponible.`
      );
    }
  };

  return (
    <div className="px-4">
      {/* Progress Section */}
      <Row className="mt-5">
        <Col md="12">
          <Card
            className="shadow-lg rounded-lg"
            style={{ backgroundColor: "#F9FAFB" }}
          >
            <CardBody>
              <h3
                className="text-center font-weight-bold mb-4"
                style={{ fontSize: "2rem", color: "#333" }}
              >
                Indicaciones del Proceso
              </h3>

              {/* Nuevo Diseño para los Pasos */}
              <Row className="text-center">
                {/* Paso 1 */}
                <Col md="4" className="mb-4">
                  <div
                    className="p-4 rounded-lg shadow-sm"
                    style={{ backgroundColor: "#E8F5E9" }}
                  >
                    <div className="mb-3">
                      <i className="nc-icon nc-paper fa-3x text-success"></i>
                    </div>
                    <h4 className="font-weight-bold text-success">Paso 1</h4>
                    <h5 className="text-muted">Documentación</h5>
                    <p>
                      Completa y envía los documentos requeridos para la
                      matrícula.
                    </p>
                  </div>
                </Col>

                {/* Paso 2 */}
                <Col md="4" className="mb-4">
                  <div
                    className="p-4 rounded-lg shadow-sm"
                    style={{ backgroundColor: "#FFF3E0" }}
                  >
                    <div className="mb-3">
                      <i className="nc-icon nc-credit-card fa-3x text-warning"></i>
                    </div>
                    <h4 className="font-weight-bold text-warning">Paso 2</h4>
                    <h5 className="text-muted">Pago</h5>
                    <p>
                      Realiza el pago de la matrícula y la pensión según las
                      indicaciones.
                    </p>
                  </div>
                </Col>

                {/* Paso 3 */}
                <Col md="4" className="mb-4">
                  <div
                    className="p-4 rounded-lg shadow-sm"
                    style={{ backgroundColor: "#FFEBEE" }}
                  >
                    <div className="mb-3">
                      <i className="nc-icon nc-check-2 fa-3x text-danger"></i>
                    </div>
                    <h4 className="font-weight-bold text-danger">Paso 3</h4>
                    <h5 className="text-muted">Confirmación</h5>
                    <p>
                      Recibe la confirmación de tu matrícula y prepara todo para
                      el inicio de clases.
                    </p>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Main Content Grid */}
      <Row className="mt-5">
        <Col md="6">
          <Card className="shadow-lg rounded-lg h-100">
            <CardBody>
              <CardTitle
                tag="h4"
                className="text-center font-weight-bold mb-4"
                style={{ color: "#343a40" }}
              >
                <i className="nc-icon nc-money-coins mr-2"></i>
                Educación Inicial
              </CardTitle>
              <ul
                className="list-unstyled"
                style={{ fontSize: "1rem", color: "#555" }}
              >
                {["Inicial 2 (3 años)", "Inicial 2 (4 años)"].map(
                  (item, index) => (
                    <li key={index} className="mb-3 d-flex align-items-center">
                      <i className="nc-icon nc-check-2 text-success mr-2"></i>
                      {item}
                    </li>
                  )
                )}
              </ul>
              {/* Sección de Matrícula y Pensión (Diseño Original) */}
              <div className="bg-light p-4 rounded text-center mt-4">
                <h5 className="text-success font-weight-bold mb-2">
                  Matrícula: $
                  {initialEducationInfo
                    ? initialEducationInfo.matriculaFee
                    : "20"}
                </h5>
                <h5 className="text-success font-weight-bold mb-0">
                  Pensión: $
                  {initialEducationInfo
                    ? initialEducationInfo.tuitionFee
                    : "15"}
                </h5>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md="6">
          <Card className="shadow-lg rounded-lg h-100">
            <CardBody>
              <CardTitle
                tag="h4"
                className="text-center font-weight-bold mb-4"
                style={{ color: "#343a40" }}
              >
                <i className="nc-icon nc-hat-3 mr-2"></i>
                Educación Básica
              </CardTitle>
              <ul
                className="list-unstyled"
                style={{ fontSize: "1rem", color: "#555" }}
              >
                {[
                  "Preparatoria y Básica Elemental (1ro, 2do, 3ro y 4to EGB)",
                  "Básica Media (5to, 6to y 7mo EGB)",
                ].map((item, index) => (
                  <li key={index} className="mb-3 d-flex align-items-center">
                    <i className="nc-icon nc-check-2 text-success mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
              {/* Sección de Matrícula y Pensión (Diseño Original) */}
              <div className="bg-light p-4 rounded text-center mt-4">
                <h5 className="text-success font-weight-bold mb-2">
                  Matrícula: $
                  {basicEducationInfo ? basicEducationInfo.matriculaFee : "25"}
                </h5>
                <h5 className="text-success font-weight-bold mb-0">
                  Pensión: $
                  {basicEducationInfo ? basicEducationInfo.tuitionFee : "20"}
                </h5>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md="6">
          <Card className="shadow-lg rounded-lg h-100">
            <CardBody>
              <CardTitle
                tag="h4"
                className="text-center font-weight-bold mb-4"
                style={{ color: "#343a40" }}
              >
                <i className="nc-icon nc-paper mr-2"></i>
                Requerimientos Ed. Inicial
              </CardTitle>
              <ul
                className="list-unstyled"
                style={{ fontSize: "1rem", color: "#555" }}
              >
                {initialEducationInfo?.requiredDocuments
                  ? initialEducationInfo.requiredDocuments.map((doc, index) => (
                      <li
                        key={index}
                        className="mb-3 d-flex align-items-center"
                      >
                        <i className="nc-icon nc-check-2 text-success mr-2"></i>
                        {doc}
                      </li>
                    ))
                  : [
                      "Formulario de matrícula",
                      "Documentos de identidad",
                      "Certificados médicos y académicos",
                      "Fotos tamaño carnet",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="mb-3 d-flex align-items-center"
                      >
                        <i className="nc-icon nc-check-2 text-success mr-2"></i>
                        {item}
                      </li>
                    ))}
              </ul>
              <Button
                className="btn-round d-block w-100 mt-4"
                color="info"
                style={{ padding: "12px", fontWeight: "bold" }}
                onClick={() =>
                  downloadFileByTag(
                    "Matrícula - Formulario de Matrícula Ed. Inicial"
                  )
                }
              >
                Descargar Formulario
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md="6">
          <Card className="shadow-lg rounded-lg h-100">
            <CardBody>
              <CardTitle
                tag="h4"
                className="text-center font-weight-bold mb-4"
                style={{ color: "#343a40" }}
              >
                <i className="nc-icon nc-calendar-60 mr-2"></i>
                Fechas Importantes Ed. Inicial
              </CardTitle>
              <ul
                className="list-unstyled"
                style={{ fontSize: "1rem", color: "#555" }}
              >
                {initialEducationInfo?.importantDates
                  ? initialEducationInfo.importantDates.map((date, index) => (
                      <li
                        key={index}
                        className="mb-3 d-flex align-items-center"
                      >
                        <i className="nc-icon nc-check-2 text-success mr-2"></i>
                        {date}
                      </li>
                    ))
                  : [
                      "Inicio de matrículas: julio",
                      "Pagos por inscripción y matrícula: agosto",
                      "Inicio de clases: septiembre",
                      "Inducción: primera semana de septiembre",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="mb-3 d-flex align-items-center"
                      >
                        <i className="nc-icon nc-check-2 text-success mr-2"></i>
                        {item}
                      </li>
                    ))}
              </ul>
              <Button
                className="btn-round d-block w-100 mt-4"
                color="danger"
                style={{ padding: "12px", fontWeight: "bold" }}
                onClick={() =>
                  downloadFileByTag(
                    "Matrícula - Fechas e Información de Matrícula Ed. Inicial"
                  )
                }
              >
                Más información
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md="6">
          <Card className="shadow-lg rounded-lg h-100">
            <CardBody>
              <CardTitle
                tag="h4"
                className="text-center font-weight-bold mb-4"
                style={{ color: "#343a40" }}
              >
                <i className="nc-icon nc-paper mr-2"></i>
                Requerimientos Ed. Básica
              </CardTitle>
              <ul
                className="list-unstyled"
                style={{ fontSize: "1rem", color: "#555" }}
              >
                {basicEducationInfo?.requiredDocuments
                  ? basicEducationInfo.requiredDocuments.map((doc, index) => (
                      <li
                        key={index}
                        className="mb-3 d-flex align-items-center"
                      >
                        <i className="nc-icon nc-check-2 text-success mr-2"></i>
                        {doc}
                      </li>
                    ))
                  : [
                      "Formulario de matrícula",
                      "Documentos de identidad",
                      "Certificados médicos y académicos",
                      "Fotos tamaño carnet",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="mb-3 d-flex align-items-center"
                      >
                        <i className="nc-icon nc-check-2 text-success mr-2"></i>
                        {item}
                      </li>
                    ))}
              </ul>
              <Button
                className="btn-round d-block w-100 mt-4"
                color="info"
                style={{ padding: "12px", fontWeight: "bold" }}
                onClick={() =>
                  downloadFileByTag(
                    "Matrícula - Formulario de Matrícula Ed. Básica"
                  )
                }
              >
                Descargar Formulario
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md="6">
          <Card className="shadow-lg rounded-lg h-100">
            <CardBody>
              <CardTitle
                tag="h4"
                className="text-center font-weight-bold mb-4"
                style={{ color: "#343a40" }}
              >
                <i className="nc-icon nc-calendar-60 mr-2"></i>
                Fechas Importantes Ed. Básica
              </CardTitle>
              <ul
                className="list-unstyled"
                style={{ fontSize: "1rem", color: "#555" }}
              >
                {basicEducationInfo?.importantDates
                  ? basicEducationInfo.importantDates.map((date, index) => (
                      <li
                        key={index}
                        className="mb-3 d-flex align-items-center"
                      >
                        <i className="nc-icon nc-check-2 text-success mr-2"></i>
                        {date}
                      </li>
                    ))
                  : [
                      "Inicio de matrículas: julio",
                      "Pagos por inscripción y matrícula: agosto",
                      "Inicio de clases: septiembre",
                      "Inducción: primera semana de septiembre",
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="mb-3 d-flex align-items-center"
                      >
                        <i className="nc-icon nc-check-2 text-success mr-2"></i>
                        {item}
                      </li>
                    ))}
              </ul>
              <Button
                className="btn-round d-block w-100 mt-4"
                color="danger"
                style={{ padding: "12px", fontWeight: "bold" }}
                onClick={() =>
                  downloadFileByTag(
                    "Matrícula - Fechas e Información de Matrícula Ed. Básica"
                  )
                }
              >
                Más información
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Help Section */}
      <Row className="mt-5 mb-5">
        <Col md="12">
          <Card className="shadow-lg rounded-lg bg-info text-white">
            <CardBody className="text-center py-5">
              <i
                className="nc-icon nc-chat-33 mb-3"
                style={{ fontSize: "3rem" }}
              ></i>
              <h3
                className="font-weight-bold mb-3"
                style={{ fontSize: "2rem" }}
              >
                ¿Necesitas ayuda?
              </h3>
              <p className="mb-4" style={{ fontSize: "1.2rem" }}>
                Nuestro equipo de admisiones está disponible para ayudarte en
                todo el proceso. Contáctanos para resolver tus dudas.
              </p>
              <Button
                className="btn-round btn-lg"
                color="neutral"
                style={{ padding: "12px 30px", fontWeight: "bold" }}
              >
                <NavLink
                  to="https://wa.me/+593995421432"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-success cursor-pointer" />{" "}
                  Contactar Admisiones
                </NavLink>
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EnrollmentDashboard;
