import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

// components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import EdBasicaHeader from "components/Headers/EdBasicaHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function EdBasicaPage() {
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ExamplesNavbar />
      <EdBasicaHeader />
      <div
        className="section"
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
                Educación General Básica
              </h2>
              <h5
                className="text-center justify-content-center description"
                style={{
                  fontSize: "22px",
                  color: "black",
                  marginTop: "30px",
                  fontWeight: "500",
                }}
              >
                Formación integral basada en valores, excelencia académica y
                desarrollo de habilidades para el siglo XXI.
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
                  <Nav role="tablist" tabs>
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
                        Básica Elemental (2do - 4to grado)
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
                        Básica Media (5to - 7mo grado)
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
                      <Card className="d-flex flex-column h-100">
                        <CardImg
                          alt="Básica Elemental"
                          src={require("assets/img/Alinambi/edBasicaPic0ne.jpg")}
                          top
                        />
                        <CardBody
                          className="flex-grow-1 d-flex flex-column"
                          style={{
                            backgroundColor: "rgba(255, 187, 89, 0.9)",
                          }}
                        >
                          <CardTitle
                            tag="h4"
                            className="text-white text-center"
                            style={{ fontWeight: "bold" }}
                          >
                            <b style={{ color: "#343a40" }}>Áreas Académicas</b>
                          </CardTitle>
                          <br />
                          <ul
                            className="text-white flex-grow-1"
                            style={{ fontWeight: "bold" }}
                          >
                            <li>Lengua y Literatura</li>
                            <li>Lectura y dictado</li>
                            <li>Matemáticas</li>
                            <li>Ciencias Naturales</li>
                            <li>Estudios Sociales</li>
                            <li>Educación Cultural y Artística</li>
                            <li>Educación Física</li>
                            <li>Inglés</li>
                          </ul>
                        </CardBody>
                      </Card>
                    </Col>

                    <Col md="6">
                      <Card className="d-flex flex-column h-100">
                        <CardImg
                          alt="Metodología Elemental"
                          src={require("assets/img/Alinambi/edBasicaPicTwo.jpg")}
                          top
                        />
                        <CardBody
                          className="flex-grow-1 d-flex flex-column"
                          style={{
                            backgroundColor: "rgba(255, 160, 122, 0.9)",
                          }}
                        >
                          <CardTitle
                            tag="h4"
                            className="text-white text-center"
                            style={{ fontWeight: "bold" }}
                          >
                            <b style={{ color: "#343a40" }}>Metodología</b>
                          </CardTitle>
                          <br />
                          <ul
                            className="text-white flex-grow-1"
                            style={{ fontWeight: "bold" }}
                          >
                            <li>Aprendizaje significativo</li>
                            <li>Desarrollo de competencias</li>
                            <li>Trabajo colaborativo</li>
                            <li>Proyectos interdisciplinarios</li>
                            <li>Uso de recursos didácticos modernos</li>
                          </ul>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col md="6">
                      <Card className="d-flex flex-column h-100">
                        <CardImg
                          alt="Básica Media"
                          src={require("assets/img/Alinambi/edBasicaPicThree.jpg")}
                          top
                        />
                        <CardBody
                          className="flex-grow-1 d-flex flex-column"
                          style={{
                            backgroundColor: "rgba(180, 155, 200, 0.9)",
                          }}
                        >
                          <CardTitle
                            tag="h4"
                            className="text-white text-center"
                            style={{ fontWeight: "bold" }}
                          >
                            <b style={{ color: "#343a40" }}>Áreas Académicas</b>
                          </CardTitle>
                          <br />
                          <ul
                            className="text-white flex-grow-1"
                            style={{ fontWeight: "bold" }}
                          >
                            <li>Lengua y Literatura</li>
                            <li>Lectura y acompañamiento</li>
                            <li>Matemáticas con razonamiento lógico</li>
                            <li>Ciencias Naturales experimentales</li>
                            <li>Estudios Sociales y ciudadanía</li>
                            <li>Educación Cultural Artística</li>
                            <li>Educación Física</li>
                            <li>Inglés intermedio</li>
                          </ul>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md="6">
                      <Card className="d-flex flex-column h-100">
                        <CardImg
                          alt="Actividades Media"
                          src={require("assets/img/Alinambi/fotoAlinambiTrece.jpg")}
                          style={{
                            height: "330px",
                          }}
                          top
                        />
                        <CardBody
                          className="flex-grow-1 d-flex flex-column"
                          style={{
                            backgroundColor: "rgba(255, 183, 128, 0.9)",
                          }}
                        >
                          <CardTitle
                            tag="h4"
                            className="text-white text-center"
                            style={{ fontWeight: "bold" }}
                          >
                            <b style={{ color: "#343a40" }}>
                              Actividades Complementarias{" "}
                            </b>
                          </CardTitle>
                          <br />
                          <ul
                            className="text-white flex-grow-1"
                            style={{ fontWeight: "bold" }}
                          >
                            <li>Concursos académicos</li>
                            <li>Salidas pedagógicas</li>
                            <li>Actividades deportivas</li>
                            <li>Talleres artísticos</li>
                            <li>Proyectos de integración comunitaria</li>
                          </ul>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md="6">
              <Card className="card-plain">
                <CardBody>
                  <CardTitle tag="h4">Perfil de Salida</CardTitle>
                  <br />
                  <ul>
                  <li>Pensamiento crítico y analítico</li>
                            <li>Actitudes competitivas</li>
                            <li>Habilidades de comunicación</li>
                            <li>Valores y ética</li>
                            <li>Preparación para bachillerato</li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className="card-plain">
                <CardBody>
                  <CardTitle tag="h4">Proyectos Especiales</CardTitle>
                  <br />
                  <ul>
                  <li>Ferias y ceremonias de integración</li>
                            <li>Modelo gubernamental</li>
                            <li>Proyectos comunitarios</li>
                            <li>Intercambios culturales</li>
                            <li>Elecciones y consejo estudiantil</li>
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md="12">
              <Card className="card-plain bg-primary">
                <CardBody>
                  <h3
                    className="text-white text-center"
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.75rem",
                      marginBottom: "2rem",
                    }}
                  >
                    Horario Académico
                  </h3>
                  <Row>
                    <Col md="6" className="text-center">
                      <h5
                        className="text-white"
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.25rem",
                          marginBottom: "1rem",
                        }}
                      >
                        Jornada Matutina
                      </h5>
                      <p
                        className="text-white"
                        style={{
                          fontWeight: "normal",
                          fontSize: "1rem",
                        }}
                      >
                        Lunes a Viernes
                        <br />
                        7:15 AM - 13:45 PM
                      </p>
                    </Col>
                    <Col md="6" className="text-center">
                      <h5
                        className="text-white"
                        style={{
                          fontWeight: "bold",
                          fontSize: "1.25rem",
                          marginBottom: "1rem",
                        }}
                      >
                        Actividades Extracurriculares
                      </h5>
                      <p
                        className="text-white"
                        style={{
                          fontWeight: "normal",
                          fontSize: "1rem",
                        }}
                      >
                        Lunes a Viernes
                        <br />
                        Hora coordinada con el tutor
                      </p>
                    </Col>
                  </Row>
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

export default EdBasicaPage;
