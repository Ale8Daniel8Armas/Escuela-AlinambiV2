import React from "react";
import { Container, Row, Col } from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import MatriculaHeader from "components/Headers/MatriculaHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import MatriculaSection from "views/secciones/informacion/MatriculaSection.js";

function MatriculaPage() {
  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <MatriculaHeader />
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
                Proceso de Matrícula
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
                Conoce los pasos y requisitos necesarios para matricular a tu
                hijo/a en nuestra institución educativa.
              </h5>
            </Col>
          </Row>
          <br />
          <MatriculaSection />
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default MatriculaPage;
