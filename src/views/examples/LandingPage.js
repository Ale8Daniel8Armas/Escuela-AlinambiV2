import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import AlianzaCarousel from "views/index-sections/alinambi-sections/AlianzasCarousel.js";

function LandingPage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <LandingPageHeader />
      <div
        className="main"
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
        <div className="section text-center">
          <Container
            style={{
              textAlign: "center",
              padding: "50px 20px",
              background: "linear-gradient(to right, #f0f8ff, #e6ffe6)",
              borderRadius: "15px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Row>
              <Col md="8" className="mx-auto">
                <h1
                  className="WelcomeTitle"
                  style={{
                    fontSize: "33px",
                    fontWeight: "bold",
                    color: "#2c3e50",
                    letterSpacing: "1.5px",
                    marginBottom: "15px",
                    textTransform: "uppercase",
                    marginTop: "35px",
                  }}
                >
                  Bienvenidos a la Unidad Educativa Fiscomisional Aliñambi
                </h1>
                <p
                  className="Descripcion"
                  style={{
                    fontSize: "22px",
                    fontStyle: "italic",
                    color: "#4CAF50",
                    marginTop: "10px",
                    fontWeight: "500",
                  }}
                >
                  "Donde la solidaridad es un camino, la verdad se dice y se
                  vive, la justicia se ama y la amistad nos une"
                </p>
              </Col>
            </Row>
          </Container>
        </div>
        <div>
          <Row className="justify-content-center">
            <Col md="8">
              <h2
                className="text-center title"
                style={{
                  fontSize: "33px",
                  fontWeight: "bold",
                  color: "#1E90FF",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  marginBottom: "15px",
                }}
              >
                Nuestros Proyectos y Actividades
              </h2>
              <h3
                className="justify-content-center description"
                style={{ color: "black" }}
              >
                La Unidad Educativa Fiscomisional Aliñambi un centro educativo
                especializado en la educación básica. Contribuimos al desarrollo
                de la sociedad formando personas de calidad a través de
                actividades y programas planificados, apoyados por alianzas
                estratégicas.
              </h3>
              <br></br>
              <h2
                className="text-center"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#1E90FF",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  marginBottom: "15px",
                }}
              >
                ¡Descubre nuestros proyectos y actividades!
              </h2>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md="4">
              <Card className="d-flex flex-column h-100">
                <CardImg
                  alt="Convenios Académicos"
                  src={require("assets/img/Alinambi/campaniaReciclaje.jpg")}
                  top
                />
                <CardBody className="bg-info flex-grow-1 d-flex flex-column">
                  <CardTitle
                    tag="h4"
                    className="text-white text-center"
                    style={{ marginBottom: "10px" }}
                  >
                    Proyecto de Reciclaje
                  </CardTitle>
                  <CardText className="text-white">
                  Este proyecto busca sensibilizar a estudiantes, docentes y personal administrativo sobre la importancia del reciclaje, incentivando la separación adecuada de desechos y el uso responsable de los recursos, con el propósito de contribuir a la conservación del medio ambiente y generar un impacto positivo en la sociedad.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="d-flex flex-column h-100">
                <CardImg
                  alt="Convenios Deportivos"
                  src={require("assets/img/Alinambi/fotoAlinambiDos.jpg")}
                  top
                />
                <CardBody className="bg-primary flex-grow-1 d-flex flex-column">
                  <CardTitle
                    tag="h4"
                    className="text-white text-center"
                    style={{ marginBottom: "10px" }}
                  >
                    Proyecto Centro de Capacitación Técnica Productiva
                  </CardTitle>
                  <CardText className="text-white">
                    Este proyecto busca facilitar el ingreso de los niños a
                    colegios técnicos mediante cursos de nivelación,
                    proporcionándoles conocimientos básicos sobre la vida, el
                    país y sus problemas sociales, económicos, políticos y
                    culturales, con el objetivo de mejorar su nivel de vida.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="d-flex flex-column h-100">
                <CardImg
                  alt="Convenios Culturales"
                  src={require("assets/img/Alinambi/ActividadesFestivas.jpg")}
                  top
                />
                <CardBody className="bg-info flex-grow-1 d-flex flex-column">
                  <CardTitle
                    tag="h4"
                    className="text-white text-center"
                    style={{ marginBottom: "10px" }}
                  >
                    Actividades caritativas y festivas
                  </CardTitle>
                  <CardText className="text-white">
                    Realización de presentaciones y shows artísticos en el marco
                    de eventos o festividades nacionales, a cargo de
                    profesionales y preprofesionales académicos, con el fin de
                    promover una mayor integración tanto en la comunidad
                    estudiantil como en las familias.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <br />
        <div className="d-flex justify-content-center align-items-center">
          <Link to="/actividades-page">
            <Button className="btn-round text-center" color="danger" outline>
              <i className="fa fa-pen" />
              Más Actividades
            </Button>
          </Link>
        </div>
        <br />
        <div className="section section-dark text-center">
          <Container>
            <h2 className="title" style={{ marginTop: "15px" }}>
              Áreas Destacadas
            </h2>
            <Container>
              <Row>
                {/* Primera fila */}
                <Col md="3">
                  <Link to="/matricula-page" style={{ textDecoration: "none" }}>
                    <Card
                      data-background="image"
                      style={{
                        backgroundImage:
                          "url(" +
                          require("assets/img/Alinambi/matriculacionPic.jpg") +
                          ")",
                      }}
                    >
                      <CardBody>
                        <h6
                          className="card-category"
                          style={{ fontWeight: "bold" }}
                        >
                          Matriculación
                        </h6>
                        <br />
                        <p>
                          Accede a información sobre el proceso de inscripción y
                          matrícula para nuevos estudiantes.
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
                <Col md="3">
                  <Link
                    to="/admisiones-page"
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      data-background="image"
                      style={{
                        backgroundImage:
                          "url(" +
                          require("assets/img/Alinambi/admisionesPic.jpg") +
                          ")",
                      }}
                    >
                      <CardBody>
                        <h6
                          className="card-category"
                          style={{ fontWeight: "bold" }}
                        >
                          Admisiones
                        </h6>
                        <br />
                        <p>
                          Conoce los requisitos y pasos para formar parte de
                          nuestra comunidad educativa.
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
                <Col md="3">
                  <Link to="/historia-page" style={{ textDecoration: "none" }}>
                    <Card
                      data-background="image"
                      style={{
                        backgroundImage:
                          "url(" +
                          require("assets/img/Alinambi/AlinambiInicios.jpg") +
                          ")",
                      }}
                    >
                      <CardBody>
                        <h6
                          className="card-category"
                          style={{ fontWeight: "bold" }}
                        >
                          Historia
                        </h6>
                        <br />
                        <p>
                          Descubre nuestra trayectoria y compromiso con la
                          educación de calidad.
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
                <Col md="3">
                  <Link to="/servicios-page" style={{ textDecoration: "none" }}>
                    <Card
                      data-background="image"
                      style={{
                        backgroundImage:
                          "url(" +
                          require("assets/img/Alinambi/divinoNinioAlinambi.jpg") +
                          ")",
                      }}
                    >
                      <CardBody>
                        <h6
                          className="card-category"
                          style={{ fontWeight: "bold" }}
                        >
                          Servicios
                        </h6>
                        <br />
                        <p>
                          Conoce los servicios que ofrecemos para garantizar un
                          aprendizaje integral.
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
              </Row>
              <Row>
                {/* Segunda fila */}
                <Col md="3">
                  <Link to="/contactos-page" style={{ textDecoration: "none" }}>
                    <Card
                      data-background="image"
                      style={{
                        backgroundImage:
                          "url(" +
                          require("assets/img/Alinambi/contactosPic.jpg") +
                          ")",
                      }}
                    >
                      <CardBody>
                        <h6
                          className="card-category"
                          style={{ fontWeight: "bold" }}
                        >
                          Contactos
                        </h6>
                        <br />
                        <p>
                          Contáctanos para resolver tus dudas y obtener más
                          información.
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
                <Col md="3">
                  <Link
                    to="/actividades-page"
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      data-background="image"
                      style={{
                        backgroundImage:
                          "url(" +
                          require("assets/img/Alinambi/fotoAlinambiCatorce.jpg") +
                          ")",
                      }}
                    >
                      <CardBody>
                        <h6
                          className="card-category"
                          style={{ fontWeight: "bold" }}
                        >
                          Actividades
                        </h6>
                        <br />
                        <p>
                          {" "}
                          Conoce nuestras actividades extracurriculares y
                          eventos especiales.
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
                <Col md="3">
                  <Link to="/boletines-page" style={{ textDecoration: "none" }}>
                    <Card
                      data-background="image"
                      style={{
                        backgroundImage:
                          "url(" +
                          require("assets/img/Alinambi/agendasAlinambi.jpg") +
                          ")",
                      }}
                    >
                      <CardBody>
                        <h6
                          className="card-category"
                          style={{ fontWeight: "bold" }}
                        >
                          Boletines Informativos
                        </h6>
                        <br />
                        <p>
                          Encuentra documentos y archivos de nuestra entidad para cualquier información.
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
                <Col md="3">
                  <Link to="/fundacion-page" style={{ textDecoration: "none" }}>
                    <Card
                      data-background="image"
                      style={{
                        backgroundImage:
                          "url(" +
                          require("assets/img/Alinambi/fotoAlinambiVeintiCuatro.jpg") +
                          ")",
                      }}
                    >
                      <CardBody>
                        <h6
                          className="card-category"
                          style={{ fontWeight: "bold" }}
                        >
                          Nuestra Fundación
                        </h6>
                        <br />
                        <p>
                          Aprende más sobre los valores y objetivos que guían
                          nuestra fundación.
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
              </Row>
            </Container>
          </Container>
        </div>
        <AlianzaCarousel />
        <div className="d-flex justify-content-center align-items-center">
          <Link to="/convenios-page">
            <Button className="btn-round text-center" color="primary" outline>
              <i className="fa fa-heart" />
              Conoce más
            </Button>
          </Link>
        </div>
        <br />
        <DemoFooter />
      </div>
    </>
  );
}

export default LandingPage;
