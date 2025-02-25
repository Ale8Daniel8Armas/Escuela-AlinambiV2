import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

const TeamSection = () => {
  const teamMembers = [
    {
      title: "Dirección",
      name: "Título/Grado + Nombre Directora",
      description: "Rectora de la institución",
      image: require("assets/img/default-avatar.png"),
      color: "primary",
    },
    {
      title: "Dirección",
      name: "Título/Grado + Nombre Director/a",
      description: "Vicerrector/a de la institución",
      image: require("assets/img/default-avatar.png"),
      color: "info",
    },
    {
      title: "DECE",
      name: "Título/Grado + Nombre Director/a",
      description: "Supervisor/a de la institución",
      image: require("assets/img/default-avatar.png"),
      color: "primary",
    },
    {
      title: "DECE",
      name: "Título/Grado + Nombre Director/a",
      description: "Psicología y atención",
      image: require("assets/img/default-avatar.png"),
      color: "info",
    },
  ];

  return (
    <div className="section section-team">
      <Container>
        <Row>
          <Col className="text-center mb-6">
            <h2
              className="text-center"
              style={{ fontWeight: "bold", color: "#1E90FF" }}
            >
              Conozca nuestro consejo estudiantil
            </h2>
          </Col>
        </Row>
        <Row>
          {teamMembers.map((member, index) => (
            <Col key={index} xs={12} sm={6} md={3} className="mb-4">
              <Card
                className={`shadow-lg bg-${member.color} card-profile text-center`}
                style={{
                  height: "100%",
                  minHeight: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="img-circle-wrapper text-center mt-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="img-circle img-no-padding img-responsive"
                    style={{
                      marginTop: "50px",
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: `2px solid ${member.color}`,
                    }}
                  />
                </div>
                <CardBody>
                  <h6 className="text-light">{member.title}</h6>
                  <CardTitle tag="h4" className="mb-2 text-white">
                    {member.name}
                  </CardTitle>
                  <CardText
                    className="description text-white"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                  >
                    {member.description}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TeamSection;
