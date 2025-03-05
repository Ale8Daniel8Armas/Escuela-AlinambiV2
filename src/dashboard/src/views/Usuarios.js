import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

function User() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false); // Modal para agregar/editar usuario
  const [notificationModal, setNotificationModal] = useState(false); // Modal para notificaciones
  const [notificationMessage, setNotificationMessage] = useState(""); // Mensaje de notificación
  const [notificationColor, setNotificationColor] = useState("success"); // Color de la notificación (success, danger, etc.)
  const [editMode, setEditMode] = useState(false); // Modo edición
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    username: "",
    email: "",
    password: "",
  });

  const fetchUsers = React.useCallback(async () => {
    try {
      const response = await axios.get(
        "https://alinambiback.onrender.com/api/users"
      );
      setUsers(response.data);
    } catch (error) {
      showNotification("Error al cargar los usuarios.", "danger");
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Función para mostrar notificaciones
  const showNotification = (message, color = "success") => {
    setNotificationMessage(message);
    setNotificationColor(color);
    setNotificationModal(true);

    // Cerrar la notificación automáticamente después de 3 segundos
    setTimeout(() => {
      setNotificationModal(false);
    }, 3000);
  };

  // Función para abrir el modal (agregar o editar)
  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      setEditMode(false);
      setCurrentUser({ _id: "", username: "", email: "", password: "" });
    }
  };

  // Función para manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  // Función para guardar un usuario (crear o actualizar)
  const saveUser = async () => {
    try {
      if (editMode) {
        // Actualizar usuario existente
        await axios.put(
          `https://alinambiback.onrender.com/api/users/${currentUser._id}`,
          currentUser
        );
        showNotification("Usuario actualizado correctamente.");
      } else {
        // Crear nuevo usuario
        await axios.post(
          "https://alinambiback.onrender.com/api/users",
          currentUser
        );
        showNotification("Usuario creado correctamente.");
      }
      toggleModal();
      fetchUsers();
    } catch (error) {
      showNotification("Error al guardar el usuario.", "danger");
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://alinambiback.onrender.com/api/users/${id}`);
      showNotification("Usuario eliminado correctamente.");
      fetchUsers();
    } catch (error) {
      showNotification("Error al eliminar el usuario.", "danger");
    }
  };

  // Función para editar un usuario
  const editUser = (user) => {
    setCurrentUser(user);
    setEditMode(true);
    setModal(true);
  };

  return (
    <>
      <br />
      <br />
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Gestión de Usuarios</h5>
              </CardHeader>
              <CardBody>
                <Button color="primary" onClick={toggleModal}>
                  Agregar Usuario
                </Button>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Nombre de Usuario</th>
                      <th>Email</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <Button
                            color="info"
                            size="sm"
                            onClick={() => editUser(user)}
                          >
                            Editar
                          </Button>{" "}
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => deleteUser(user._id)}
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Modal para agregar/editar usuario */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {editMode ? "Editar Usuario" : "Agregar Usuario"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Nombre de Usuario</Label>
              <Input
                type="text"
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Contraseña</Label>
              <Input
                type="password"
                name="password"
                value={currentUser.password}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveUser}>
            Guardar
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal para notificaciones */}
      <Modal
        isOpen={notificationModal}
        toggle={() => setNotificationModal(false)}
      >
        <ModalHeader toggle={() => setNotificationModal(false)}>
          Notificación
        </ModalHeader>
        <ModalBody>
          <Alert color={notificationColor}>{notificationMessage}</Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setNotificationModal(false)}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default User;
