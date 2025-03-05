import React from "react";

import { Container, Row, Col } from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ServiciosPageHeader from "components/Headers/ServiciosHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import ServiciosContent from "views/secciones/Servicios.js";

function ServiciosPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <ServiciosPageHeader />
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
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md="12">
              <h3
                className="text-center"
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#1E90FF",
                  letterSpacing: "1.5px",
                  marginBottom: "15px",
                  textTransform: "uppercase",
                  marginTop: "35px",
                }}
              >
                Contamos con servicios de calidad
              </h3>
            </Col>
          </Row>
          <ServiciosContent />
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default ServiciosPage;
