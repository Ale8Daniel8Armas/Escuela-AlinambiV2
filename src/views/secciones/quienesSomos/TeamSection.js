import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import axios from "axios";

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  // Obtener los miembros desde la API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(
          "https://alinambiback.onrender.com/api/members"
        );
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Error al obtener los miembros:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  // Datos predeterminados para los miembros
  const defaultMembers = [
    {
      role: "Aún no definido",
      name: "",
      description: "",
      image: require("assets/img/default-avatar.png"),
    },
    {
      role: "Aún no definido",
      name: "",
      description: "",
      image: require("assets/img/default-avatar.png"),
    },
    {
      role: "Aún no definido",
      name: "",
      description: "",
      image: require("assets/img/default-avatar.png"),
    },
    {
      role: "Aún no definido",
      name: "",
      description: "",
      image: require("assets/img/default-avatar.png"),
    },
  ];

  // Combinar miembros de la base de datos con los predeterminados
  const combinedMembers = [...teamMembers];
  for (let i = teamMembers.length; i < 4; i++) {
    combinedMembers.push(defaultMembers[i]);
  }

  return (
    <div className="section section-team">
      <Container>
        <Row>
          <Col className="text-center mb-5">
            <h2
              className="text-center"
              style={{
                fontWeight: "bold",
                color: "#1E90FF",
                marginBottom: "-120px",
              }}
            >
              ¡Conoce nuestro consejo estudiantil!
            </h2>
          </Col>
        </Row>
        <Row style={{ marginTop: "-70px" }}>
          {combinedMembers.map((member, index) => (
            <Col key={index} xs={12} sm={6} md={3} className="mb-4">
              <Card
                className={`shadow-lg ${
                  index % 2 === 0 ? "bg-primary" : ""
                } card-profile text-center`}
                style={{
                  backgroundColor: index % 2 !== 0 ? "#17174A" : undefined,
                  height: "90%",
                  minHeight: "50px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                  borderRadius: "15px",
                }}
              >
                <div style={{ marginTop: "25px", marginBottom: "10px" }}>
                  <h5
                    className="text-light mt-3"
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    Integrante {index + 1}
                  </h5>
                </div>
                <div className="img-wrapper text-center mt-3">
                  <img
                    src={
                      member.filename
                        ? `https://alinambiback.onrender.com/api/member-images/${member.filename}`
                        : member.image
                    }
                    alt={member.name}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      border: `3px solid ${
                        index % 2 === 0 ? "#1E90FF" : "#87CEEB"
                      }`,
                    }}
                  />
                </div>
                <CardBody>
                  <h6
                    className="text-light mb-3"
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      marginTop: "10px",
                    }}
                  >
                    {member.role}
                  </h6>
                  <CardTitle
                    tag="h4"
                    className="mb-2 text-white"
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginTop: "10px",
                    }}
                  >
                    {member.name}
                  </CardTitle>
                  <CardText
                    className="description text-white"
                    style={{
                      fontSize: "14px",
                      fontWeight: "normal",
                      marginTop: "20px",
                    }}
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
