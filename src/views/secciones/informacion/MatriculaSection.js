import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Progress,
} from "reactstrap";

const EnrollmentDashboard = () => {
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

              {/* Progress Bars */}
              <div className="position-relative mb-4">
                <div className="d-flex align-items-center mb-2">
                  <span className="badge badge-success px-3 py-2 mr-2">
                    Paso 1
                  </span>
                  <span className="text-muted font-weight-bold">
                    Documentación
                  </span>
                </div>
                <Progress
                  color="success"
                  value={100}
                  style={{ height: "15px" }}
                />
              </div>

              <div className="position-relative mb-4">
                <div className="d-flex align-items-center mb-2">
                  <span className="badge badge-warning px-3 py-2 mr-2">
                    Paso 2
                  </span>
                  <span className="text-muted font-weight-bold">Pago</span>
                </div>
                <Progress
                  color="warning"
                  value={100}
                  style={{ height: "15px" }}
                />
              </div>

              <div className="position-relative">
                <div className="d-flex align-items-center mb-2">
                  <span className="badge badge-danger px-3 py-2 mr-2">
                    Paso 3
                  </span>
                  <span className="text-muted font-weight-bold">
                    Confirmación
                  </span>
                </div>
                <Progress
                  color="danger"
                  value={100}
                  style={{ height: "15px" }}
                />
              </div>
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
                <i className="nc-icon nc-paper mr-2"></i>
                Documentación Requerida
              </CardTitle>
              <ul
                className="list-unstyled"
                style={{ fontSize: "1rem", color: "#555" }}
              >
                {[
                  "Formulario de matrícula",
                  "Documentos de identidad",
                  "Certificados académicos",
                  "Certificado médico",
                  "Fotos tamaño carnet",
                ].map((item, index) => (
                  <li key={index} className="mb-3 d-flex align-items-center">
                    <i className="nc-icon nc-check-2 text-success mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                className="btn-round d-block w-100 mt-4"
                color="info"
                style={{ padding: "12px", fontWeight: "bold" }}
              >
                Descargar Formularios
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
                <i className="nc-icon nc-money-coins mr-2"></i>
                Costo Inicial 2
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
              <div className="bg-light p-4 rounded text-center mt-4">
                <h5 className="text-success font-weight-bold mb-2">
                  Matrícula: $50
                </h5>
                <h5 className="text-success font-weight-bold mb-0">
                  Pensión: $25
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
                <i className="nc-icon nc-hat-3 mr-2"></i>
                Educación Básica
              </CardTitle>
              <ul
                className="list-unstyled"
                style={{ fontSize: "1rem", color: "#555" }}
              >
                {[
                  "Preparatoria (1ro EGB)",
                  "Básica Elemental (2do, 3ro y 4to EGB)",
                  "Básica Media (5to, 6to y 7mo EGB)",
                ].map((item, index) => (
                  <li key={index} className="mb-3 d-flex align-items-center">
                    <i className="nc-icon nc-check-2 text-success mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-light p-4 rounded text-center mt-4">
                <h5 className="text-success font-weight-bold mb-2">
                  Matrícula: $70
                </h5>
                <h5 className="text-success font-weight-bold mb-0">
                  Pensión: $35
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
                <i className="nc-icon nc-calendar-60 mr-2"></i>
                Fechas Importantes
              </CardTitle>
              <ul
                className="list-unstyled"
                style={{ fontSize: "1rem", color: "#555" }}
              >
                {[
                  "Inicio de matrículas: 1 de julio",
                  "Matrículas ordinarias: julio",
                  "Matrículas extraordinarias: agosto",
                  "Inicio de clases: septiembre",
                  "Inducción: última semana agosto",
                ].map((item, index) => (
                  <li key={index} className="mb-3 d-flex align-items-center">
                    <i className="nc-icon nc-check-2 text-success mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                className="btn-round d-block w-100 mt-4"
                color="danger"
                style={{ padding: "12px", fontWeight: "bold" }}
              >
                Ver Calendario
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
                Contactar Admisiones
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EnrollmentDashboard;
