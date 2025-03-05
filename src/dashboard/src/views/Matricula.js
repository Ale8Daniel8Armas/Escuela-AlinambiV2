import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

function MatriculaAdminPanel() {
  const [matriculas, setMatriculas] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [currentMatricula, setCurrentMatricula] = useState(null);
  const [formData, setFormData] = useState({
    type: "inicial",
    matriculaFee: 0,
    tuitionFee: 0,
    requiredDocuments: "",
    importantDates: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [matriculaToDelete, setMatriculaToDelete] = useState(null);

  // Obtener los datos de matrículas al cargar este componente
  useEffect(() => {
    fetchMatriculas();
  }, []);

  // Función para obtener los datos de matrículas
  const fetchMatriculas = async () => {
    try {
      const response = await axios.get(
        "https://alinambiback.onrender.com/api/matricula"
      );
      setMatriculas(response.data);
    } catch (error) {
      setErrorMessage(
        "Error al obtener matrículas. Verifica la conexión con el servidor."
      );
    }
  };

  const openEditModal = (matricula) => {
    if (matricula) {
      setCurrentMatricula(matricula);
      setFormData({
        type: matricula.type,
        matriculaFee: matricula.matriculaFee,
        tuitionFee: matricula.tuitionFee,
        requiredDocuments: matricula.requiredDocuments.join(", "),
        importantDates: matricula.importantDates.join(", "),
      });
    } else {
      setCurrentMatricula(null);
      setFormData({
        type: "inicial",
        matriculaFee: 0,
        tuitionFee: 0,
        requiredDocuments: "",
        importantDates: "",
      });
    }
    setEditModal(true);
  };

  // Función para cerrar el modal de edición
  const closeEditModal = () => {
    setEditModal(false);
    setCurrentMatricula(null);
    setErrorMessage("");
  };

  // Función para abrir el modal de confirmación de eliminación
  const openDeleteModal = (matricula) => {
    setMatriculaToDelete(matricula);
    setDeleteModal(true);
  };

  // Función para cerrar el modal de confirmación de eliminación
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setMatriculaToDelete(null);
  };

  // Función para manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para validar los campos del formulario
  const validateForm = () => {
    const {
      type,
      matriculaFee,
      tuitionFee,
      requiredDocuments,
      importantDates,
    } = formData;

    if (
      !type ||
      !matriculaFee ||
      !tuitionFee ||
      !requiredDocuments ||
      !importantDates
    ) {
      setErrorMessage("Todos los campos son obligatorios.");
      return false;
    }

    if (matriculaFee <= 0 || tuitionFee <= 0) {
      setErrorMessage(
        "Los costos de matrícula y pensión deben ser mayores que 0."
      );
      return false;
    }

    if (!requiredDocuments.trim() || !importantDates.trim()) {
      setErrorMessage(
        "Los documentos requeridos y las fechas importantes no pueden estar vacíos."
      );
      return false;
    }

    return true;
  };

  // Función para guardar los cambios (crear o actualizar)
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const data = {
        ...formData,
        requiredDocuments: formData.requiredDocuments
          .split(",")
          .map((doc) => doc.trim())
          .filter((doc) => doc !== ""),
        importantDates: formData.importantDates
          .split(",")
          .map((date) => date.trim())
          .filter((date) => date !== ""),
      };

      if (currentMatricula) {
        await axios.put(
          `https://alinambiback.onrender.com/api/matricula/${currentMatricula._id}`,
          data
        );
      } else {
        // Verificar si ya existe una matrícula del mismo tipo
        const existingMatricula = matriculas.find(
          (m) => m.type === formData.type
        );
        if (existingMatricula) {
          setErrorMessage(
            "Ya existe una matrícula para este tipo. Edita la existente."
          );
          return;
        }

        await axios.post(
          "https://alinambiback.onrender.com/api/matricula",
          data
        );
      }

      fetchMatriculas();
      closeEditModal();
    } catch (error) {
      setErrorMessage(
        "Error al guardar matrícula. Verifica la conexión con el servidor."
      );
    }
  };

  // Función para eliminar una matrícula
  const handleDelete = async () => {
    if (!matriculaToDelete) return;

    try {
      await axios.delete(
        `https://alinambiback.onrender.com/api/matriculaDelete/${matriculaToDelete._id}`
      );
      fetchMatriculas();
      closeDeleteModal();
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "Error al eliminar matrícula. Verifica la conexión con el servidor."
      );
    }
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
                <CardTitle tag="h4">
                  Administración de Información de Matrículas
                </CardTitle>
                <Button color="primary" onClick={() => openEditModal(null)}>
                  Agregar Nueva Información para Matrícula
                </Button>
              </CardHeader>
              <CardBody>
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Tipo</th>
                      <th>Costo de Matrícula</th>
                      <th>Costo de Pensión</th>
                      <th>Documentos Requeridos</th>
                      <th>Fechas Importantes</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matriculas.map((matricula) => (
                      <tr key={matricula._id}>
                        <td>{matricula.type}</td>
                        <td>${matricula.matriculaFee}</td>
                        <td>${matricula.tuitionFee}</td>
                        <td>{matricula.requiredDocuments.join(", ")}</td>
                        <td>{matricula.importantDates.join(", ")}</td>
                        <td>
                          <Button
                            color="info"
                            onClick={() => openEditModal(matricula)}
                          >
                            Editar
                          </Button>{" "}
                          <Button
                            color="danger"
                            onClick={() => openDeleteModal(matricula)}
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

      {/* Modal de Edición */}
      <Modal isOpen={editModal} toggle={closeEditModal}>
        <ModalHeader toggle={closeEditModal}>
          {currentMatricula
            ? "Editar Matrícula"
            : "Agregar Nueva Información para Matrícula"}
        </ModalHeader>
        <ModalBody>
          {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
          <Form>
            <FormGroup>
              <Label>Tipo</Label>
              <Input
                type="select"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="inicial">Educación Inicial</option>
                <option value="basica">Educación Básica</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Costo de Matrícula</Label>
              <Input
                type="number"
                name="matriculaFee"
                value={formData.matriculaFee}
                onChange={handleChange}
                min="1"
              />
            </FormGroup>
            <FormGroup>
              <Label>Costo de Pensión</Label>
              <Input
                type="number"
                name="tuitionFee"
                value={formData.tuitionFee}
                onChange={handleChange}
                min="1"
              />
            </FormGroup>
            <FormGroup>
              <Label>Documentos Requeridos</Label>
              <Input
                type="text"
                name="requiredDocuments"
                value={formData.requiredDocuments}
                onChange={handleChange}
                placeholder="Separar por comas"
              />
            </FormGroup>
            <FormGroup>
              <Label>Fechas Importantes</Label>
              <Input
                type="text"
                name="importantDates"
                value={formData.importantDates}
                onChange={handleChange}
                placeholder="Separar por comas"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Guardar
          </Button>{" "}
          <Button color="secondary" onClick={closeEditModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal de Confirmación de Eliminación */}
      <Modal isOpen={deleteModal} toggle={closeDeleteModal}>
        <ModalHeader toggle={closeDeleteModal}>
          Confirmar Eliminación
        </ModalHeader>
        <ModalBody>
          ¿Estás seguro de que deseas eliminar la matrícula de{" "}
          {matriculaToDelete?.type}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Eliminar
          </Button>{" "}
          <Button color="secondary" onClick={closeDeleteModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default MatriculaAdminPanel;
