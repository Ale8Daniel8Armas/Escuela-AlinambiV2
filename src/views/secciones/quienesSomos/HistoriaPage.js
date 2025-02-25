import React from "react";
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
  CardBody,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import HistoriaHeader from "components/Headers/HistoriaHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function HistoriaPage() {
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
  });
  return (
    <>
      <ExamplesNavbar />
      <HistoriaHeader />
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
        <Container>
          <Row>
            <Col className="text-center" md="12">
              <h2
                className="mx-auto"
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
                Historia de la Unidad Educativa Aliñambi
              </h2>
              <p
                className="descripcion-valores description"
                style={{
                  fontSize: "22px",
                  color: "black",
                  marginTop: "30px",
                  fontWeight: "500",
                }}
              >
                Somos una institución educativa fiscomisional comprometida con
                los valores de igualdad, equidad e inclusión social desde
                nuestra fundación en 2016, bajo la normativa MINEDUC-ME-2016-
                00124-A, otorgada por el Ministerio de Educación. Impulsado por
                la fundación Aliñambi hemos implementado diversos proyectos que
                han fortalecido tanto la calidad humana de nuestra comunidad
                como el compromiso con la defensa de los derechos humanos y los
                valores que nos definen y enorgullecen.
              </p>
            </Col>
          </Row>
          <div className="container py-5">
            <Row>
              <Col md="12" className="mx-auto">
                <Card className="shadow">
                  <CardBody>
                    <h3
                      className="title text-center mb-3"
                      style={{ color: "#4CAF50" }}
                    >
                      Nuestros Orígenes
                    </h3>
                    <Row style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                      <Col md="6" xs="12">
                        <img
                          alt="Fundación"
                          className="img-fluid rounded mb-3"
                          src={require("assets/img/Alinambi/AlinambiInicios.jpg")}
                        />
                      </Col>
                      <Col md="6" xs="12">
                        <p
                          className="lead"
                          style={{
                            color: "black",
                            marginTop: "20px",
                            fontWeight: "400",
                          }}
                        >
                          La Unidad Educativa Aliñambi nació por mediados de la
                          década de los noventa afianzándose en el nuevo milenio
                          con una idea revolucionaria: crear un espacio
                          educativo que combinara la excelencia académica con el
                          desarrollo integral del ser humano. Iniciamos con tres
                          aulas y pocos estudiantes, pero con una gran pasión
                          por la educación.
                        </p>
                      </Col>
                    </Row>
                    <h3
                      className="title text-center mb-3"
                      style={{ color: "#4CAF50" }}
                    >
                      Crecimiento y Logros
                    </h3>
                    <Row style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                      <Col md="6" xs="12" className="order-md-2">
                        <img
                          alt="Desarrollo"
                          className="img-fluid rounded mb-3"
                          src={require("assets/img/Alinambi/fotoAlinambiVeintiSeis.jpg")}
                        />
                      </Col>
                      <Col md="6" xs="12" className="order-md-1">
                        <p
                          className="lead"
                          style={{
                            color: "black",
                            marginTop: "20px",
                            fontWeight: "400",
                          }}
                        >
                          En el transcurso del tiempo, nuestra institución
                          creció considerablemente, con programas educativos
                          innovadores y la ampliación del campus. El amor y la
                          responsabilidad junto con el compromiso que tenemos
                          como sociedad, nos distinguen como una institución
                          única, capaz de formar personas con calidad humana y
                          de construir y alimentar sueños.
                        </p>
                      </Col>
                    </Row>
                    <h3
                      className="title text-center mb-3"
                      style={{ color: "#4CAF50" }}
                    >
                      Nuevo Milenio y Proyección Futura
                    </h3>
                    <Row style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                      <div
                        className="text-center my-4"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          gap: "15px",
                        }}
                      >
                        <img
                          alt="imagen1"
                          src={require("assets/img/Alinambi/grado-AlinambiTwo.jpg")}
                          style={{ maxWidth: "100%", width: "320px" }}
                        />
                        <img
                          alt="imagen2"
                          src={require("assets/img/Alinambi/fotoAlinambiSeis.jpg")}
                          style={{ maxWidth: "100%", width: "320px" }}
                        />
                        <img
                          alt="imagen3"
                          src={require("assets/img/Alinambi/grado-AlinambiOne.jpg")}
                          style={{ maxWidth: "100%", width: "320px" }}
                        />
                      </div>
                      <p
                        className="lead text-center"
                        style={{
                          color: "black",
                          marginTop: "10px",
                          fontWeight: "400",
                        }}
                      >
                        Hoy, la U.E. Aliñambi es referente en innovación
                        educativa, con más de 500 estudiantes y un equipo
                        docente altamente preparado y profesional. Nuestros
                        logros incluyen el apoyo de diversas instituciones
                        reconocidas más el aval de calidad primaria dentro de
                        las mejores escuelas de enseñanza a nivel local.
                      </p>
                    </Row>
                    <div className="text-center mt-4">
                      <Col
                        style={{ backgroundColor: "#1E90FF", padding: "15px" }}
                      >
                        <h5 style={{ color: "#ffffff" }}>Logros Destacados</h5>
                        <ul
                          className="list-unstyled"
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            lineHeight: "1.9",
                          }}
                        >
                          <li>
                            ✓ Acreditación Ministerial de Calidad Educativa
                          </li>
                          <li>✓ Reconocimiento por Innovación Pedagógica</li>
                          <li>✓ Centro integral y de Compromiso Social</li>
                        </ul>
                      </Col>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default HistoriaPage;
