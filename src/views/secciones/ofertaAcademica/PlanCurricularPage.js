import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import PlanCurricularHeader from "components/Headers/PlanCurricularHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function PlanCurricularPage() {
  const [activeTab, setActiveTab] = React.useState("1");

  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
  }, []);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <>
      <ExamplesNavbar />
      <PlanCurricularHeader />
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
        <Container>
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
                Plan Curricular Institucional
              </h2>
              <h5
                className="text-center justify-content-center description"
                style={{
                  fontSize: "24px",
                  color: "black",
                  marginTop: "30px",
                  fontWeight: "400",
                }}
              >
                Nuestro plan curricular está diseñado para formar estudiantes
                integrales, con sólidos conocimientos académicos y valores
                humanos.
              </h5>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="ml-auto mr-auto" md="10">
              <div
                className="nav-tabs-navigation"
                style={{
                  borderTop: "2px solid navy",
                  width: "100%",
                  margin: "10px 0",
                }}
              >
                <div className="nav-tabs-wrapper">
                  <Nav className="justify-content-center" role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => {
                          toggle("1");
                        }}
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.textShadow =
                            "2px 2px 10px rgba(0, 0, 0, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.textShadow = "none";
                        }}
                      >
                        Fundamentos
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => {
                          toggle("2");
                        }}
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.textShadow =
                            "2px 2px 10px rgba(0, 0, 0, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.textShadow = "none";
                        }}
                      >
                        Metodología
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={activeTab === "3" ? "active" : ""}
                        onClick={() => {
                          toggle("3");
                        }}
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.textShadow =
                            "2px 2px 10px rgba(0, 0, 0, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.textShadow = "none";
                        }}
                      >
                        Evaluación
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </div>
              <br />
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col md="6">
                      <Card
                        className="shadow-lg border-0"
                        style={{
                          background:
                            "linear-gradient(135deg, rgb(17, 166, 203) 0%, #2575fc 100%)",
                          color: "white",
                          borderRadius: "12px",
                        }}
                      >
                        <CardBody>
                          <CardTitle
                            tag="h4"
                            style={{
                              fontSize: "22px",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                            }}
                          >
                            Principios Pedagógicos
                          </CardTitle>
                          <ul
                            style={{ listStyleType: "none", paddingLeft: "0" }}
                          >
                            {[
                              "Educación centrada en el estudiante",
                              "Aprendizaje significativo y contextualizado",
                              "Desarrollo de competencias",
                              "Formación en valores",
                              "Innovación educativa",
                            ].map((item, index) => (
                              <li
                                key={index}
                                style={{
                                  padding: "5px 0",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                }}
                              >
                                ✅ {item}
                              </li>
                            ))}
                          </ul>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="6">
                      <Card
                        className="shadow-lg border-0"
                        style={{
                          backgroundColor: "rgb(129,174,58)",
                          color: "white",
                          borderRadius: "12px",
                        }}
                      >
                        <CardBody>
                          <CardTitle
                            tag="h4"
                            style={{
                              fontSize: "22px",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                            }}
                          >
                            Ejes Transversales
                          </CardTitle>
                          <ul
                            style={{ listStyleType: "none", paddingLeft: "0" }}
                          >
                            {[
                              "Educación en valores",
                              "Pensamiento crítico",
                              "Competencias digitales",
                              "Cuidado del medio ambiente",
                              "Responsabilidad social",
                            ].map((item, index) => (
                              <li
                                key={index}
                                style={{
                                  padding: "5px 0",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                }}
                              >
                                🌍 {item}
                              </li>
                            ))}
                          </ul>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col md="6">
                      <Card
                        className="shadow-lg border-0"
                        style={{
                          background:
                            "linear-gradient(135deg, rgb(17, 166, 203) 0%, #2575fc 100%)",
                          color: "white",
                          borderRadius: "12px",
                        }}
                      >
                        <CardBody>
                          <CardTitle
                            tag="h4"
                            style={{
                              fontSize: "22px",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                            }}
                          >
                            Estrategias de Enseñanza
                          </CardTitle>
                          <ul
                            style={{ listStyleType: "none", paddingLeft: "0" }}
                          >
                            {[
                              "Aprendizaje basado en proyectos",
                              "Trabajo colaborativo",
                              "Investigación y experimentación",
                              "Desarrollo del pensamiento",
                            ].map((item, index) => (
                              <li
                                key={index}
                                style={{
                                  padding: "5px 0",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                }}
                              >
                                ✅ {item}
                              </li>
                            ))}
                          </ul>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="6">
                      <Card
                        className="shadow-lg border-0"
                        style={{
                          backgroundColor: "rgb(129,174,58)",
                          color: "white",
                          borderRadius: "12px",
                        }}
                      >
                        <CardBody>
                          <CardTitle
                            tag="h4"
                            style={{
                              fontSize: "22px",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                            }}
                          >
                            Recursos Educativos
                          </CardTitle>
                          <ul
                            style={{ listStyleType: "none", paddingLeft: "0" }}
                          >
                            {[
                              "Plataformas digitales",
                              "Centros especializados",
                              "Material didáctico innovador",
                              "Espacios de aprendizaje flexibles",
                            ].map((item, index) => (
                              <li
                                key={index}
                                style={{
                                  padding: "5px 0",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                }}
                              >
                                🌍 {item}
                              </li>
                            ))}
                          </ul>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col md="6">
                      <Card
                        className="shadow-lg border-0"
                        style={{
                          background:
                            "linear-gradient(135deg,rgb(17, 166, 203) 0%, #2575fc 100%)",
                          color: "white",
                          borderRadius: "12px",
                        }}
                      >
                        <CardBody>
                          <CardTitle
                            tag="h4"
                            style={{
                              fontSize: "22px",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                            }}
                          >
                            Sistema de Evaluación
                          </CardTitle>
                          <ul
                            style={{ listStyleType: "none", paddingLeft: "0" }}
                          >
                            {[
                              "Evaluación diagnóstica",
                              "Evaluación formativa y sumativa",
                              "Autoevaluación y coevaluación",
                              "Rúbricas de desempeño",
                            ].map((item, index) => (
                              <li
                                key={index}
                                style={{
                                  padding: "5px 0",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                }}
                              >
                                ✅ {item}
                              </li>
                            ))}
                          </ul>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="6">
                      <Card
                        className="shadow-lg border-0"
                        style={{
                          backgroundColor: "rgb(129,174,58)",
                          color: "white",
                          borderRadius: "12px",
                        }}
                      >
                        <CardBody>
                          <CardTitle
                            tag="h4"
                            style={{
                              fontSize: "22px",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                              letterSpacing: "1px",
                            }}
                          >
                            Seguimiento Académico
                          </CardTitle>
                          <ul
                            style={{ listStyleType: "none", paddingLeft: "0" }}
                          >
                            {[
                              "Tutorías personalizadas",
                              "Reportes de progreso",
                              "Acompañamiento estudiantil",
                              "Comunicación con padres",
                            ].map((item, index) => (
                              <li
                                key={index}
                                style={{
                                  padding: "5px 0",
                                  fontSize: "16px",
                                  fontWeight: "500",
                                }}
                              >
                                🌍 {item}
                              </li>
                            ))}
                          </ul>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default PlanCurricularPage;
