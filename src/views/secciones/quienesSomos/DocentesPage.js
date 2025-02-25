import React from "react";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardText,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DocentesHeader from "components/Headers/DocentesHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import TeamSection from "views/secciones/quienesSomos/TeamSection.js";

function DocentesPage() {
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <DocentesHeader />
      <div
        className="section profile-content"
        style={{
          backgroundImage:
            "url(" + require("assets/img/Alinambi/Wallpaper.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          paddingTop: "0",
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
                  src={require("assets/img/Alinambi/DocentesAlinambi.jpeg")}
                  alt="imagen de docentes en cabecera"
                  className="img-fluid w-100"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
                <CardBody className="p-4 text-center">
                  <CardText
                    className="fw-semibold text-muted"
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                  >
                    Este es nuestro personal docente para este periodo académico
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* Sección Ejecutivos*/}
          <TeamSection />
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default DocentesPage;
