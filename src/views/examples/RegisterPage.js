import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Container,
  Row,
  Col,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const openModal = (message) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://alinambiback.onrender.com/api/login",
        {
          username,
          password,
        }
      );

      openModal("Login exitoso");

      localStorage.setItem("token", response.data.token);

      setTimeout(() => {
        navigate("/admin/panel");
      }, 2000);
    } catch (error) {
      if (error.response) {
        openModal(`${error.response.data.message || "Credenciales inválidas"}`);
      } else if (error.request) {
        openModal("El servidor está caído");
      } else {
        openModal("Error de configuración");
      }
    }
  };

  return (
    <>
      <ExamplesNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage:
            "url(" + require("assets/img/Alinambi/PortadaGeneral.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="filter"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card
                className="card-register ml-auto mr-auto"
                style={{
                  borderRadius: "15px",
                  padding: "20px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}
              >
                <h3
                  className="title mx-auto"
                  style={{
                    marginBottom: "20px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Login
                </h3>
                <Form className="register-form" onSubmit={handleLogin}>
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginBottom: "5px",
                      color: "#333",
                    }}
                  >
                    Usuario
                  </label>
                  <Input
                    placeholder="Ingresa tu usuario"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: "15px", borderRadius: "10px" }}
                  />
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginBottom: "5px",
                      color: "#333",
                    }}
                  >
                    Contraseña
                  </label>
                  <Input
                    placeholder="Ingresa tu contraseña"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: "20px", borderRadius: "10px" }}
                  />
                  <NavLink>
                    <Button
                      block
                      className="btn-round"
                      type="submit"
                      color="primary"
                      style={{
                        borderRadius: "10px",
                        padding: "10px",
                        backgroundColor: "#1A9BD5",
                        border: "none",
                      }}
                    >
                      Iniciar Sesión
                    </Button>
                  </NavLink>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Modal para mostrar mensajes */}
      <Modal isOpen={modalOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Mensaje</ModalHeader>
        <ModalBody>{modalMessage}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={closeModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default RegisterPage;
