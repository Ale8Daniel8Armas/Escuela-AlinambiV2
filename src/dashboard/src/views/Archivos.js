import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  FaCloudUploadAlt,
  FaTrash,
  FaCalendarAlt,
  FaFile,
} from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

function FileUploadForm() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Selecciona una opción");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const toggleModal = () => setModalOpen((prevState) => !prevState);

  useEffect(() => {
    fetchFiles();
  }, []);

  // Obtener el usuario actual
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken && decodedToken.id) {
        fetchCurrentUser(decodedToken.id);
      }
    }
  }, []);

  // Función para obtener el usuario actual
  const fetchCurrentUser = async (userId) => {
    try {
      const response = await fetch(
        `https://alinambiback.onrender.com/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setCurrentUser(data);
      }
    } catch (error) {
      setModalMessage("Error al obtener el usuario actual.");
      setModalOpen(true);
    }
  };

  // Función para obtener los archivos desde la API
  const fetchFiles = async () => {
    try {
      const response = await fetch(
        "https://alinambiback.onrender.com/api/files",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      if (Array.isArray(data)) {
        setFiles(data);
      } else {
        setFiles([]);
      }
    } catch (error) {
      setFiles([]);
      setModalMessage("Error al cargar los archivos.");
      setModalOpen(true);
    }
  };

  // Manejar cambio de archivo
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Manejar arrastrar y soltar archivos
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {};

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      setModalMessage("Por favor, inicia sesión para subir archivos.");
      setModalOpen(true);
      return;
    }

    if (!file) {
      setModalMessage("Por favor, selecciona un archivo.");
      setModalOpen(true);
      return;
    }

    if (!selectedOption || selectedOption === "Selecciona una opción") {
      setModalMessage("Por favor, selecciona una etiqueta para el archivo.");
      setModalOpen(true);
      return;
    }

    const existingFile = files.find((f) => f.etiqueta === selectedOption);
    if (existingFile) {
      setModalMessage(
        `Ya existe un archivo con la etiqueta "${selectedOption}". Por favor, elimina el archivo existente antes de subir uno nuevo.`
      );
      setModalOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("etiqueta", selectedOption);

    try {
      const response = await fetch(
        "https://alinambiback.onrender.com/api/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al subir el archivo.");
      }

      const data = await response.json();
      setModalMessage("Archivo subido correctamente.");
      setModalOpen(true);
      fetchFiles();
    } catch (error) {
      setModalMessage(error.message || "Error al subir el archivo.");
      setModalOpen(true);
    }
  };

  // Función para eliminar un archivo
  const handleDeleteFile = async (fileId) => {
    try {
      const response = await fetch(
        `https://alinambiback.onrender.com/api/files/${fileId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        setModalMessage("Archivo eliminado correctamente.");
        setModalOpen(true);
        fetchFiles();
      }
    } catch (error) {
      setModalMessage("Error al eliminar el archivo.");
      setModalOpen(true);
    }
  };

  // Función para descargar un archivo
  const handleDownloadFile = async (fileId) => {
    try {
      const fileResponse = await fetch(
        `https://alinambiback.onrender.com/api/files/${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!fileResponse.ok) {
        throw new Error("Error al obtener los detalles del archivo.");
      }

      const fileDetails = await fileResponse.json();
      const filename = fileDetails.filename;

      const downloadResponse = await fetch(
        `https://alinambiback.onrender.com/api/download/${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!downloadResponse.ok) {
        throw new Error("Error al descargar el archivo.");
      }

      const blob = await downloadResponse.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      setModalMessage("Error al descargar el archivo.");
      setModalOpen(true);
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />

      {/* Card 1: Tabla de archivos subidos */}
      <Card className="mt-4" style={{ maxWidth: "96%", marginLeft: "2%" }}>
        <CardBody>
          <CardTitle tag="h4" className="text-center mb-4">
            <FaFile size={30} className="mr-2" />
            Archivos Subidos
          </CardTitle>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Nombre del Archivo</th>
                <th>Tamaño</th>
                <th>Etiqueta</th>
                <th>Fecha de Subida</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {files.length > 0 ? (
                files.map((file) => (
                  <tr key={file._id}>
                    <td>{file.filename}</td>
                    <td>{file.size} KB</td>
                    <td>{file.etiqueta}</td>
                    <td>
                      <FaCalendarAlt className="mr-2" />
                      {new Date(file.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => handleDownloadFile(file._id)}
                        className="mr-2"
                      >
                        Descargar
                      </Button>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleDeleteFile(file._id)}
                      >
                        <FaTrash /> Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No hay archivos subidos.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Card 2: Formulario de subida de archivos */}
      <Card className="mt-4" style={{ maxWidth: "92%", marginLeft: "4%" }}>
        <CardBody>
          <CardTitle tag="h4" className="text-center mb-4">
            <FaCloudUploadAlt size={30} className="mr-2" />
            Subir Documentación
          </CardTitle>
          <Form className="file" onSubmit={handleSubmit}>
            <CardText className="text-center text-primary">
              <small className="text-muted">
                Por favor seleccione la etiqueta del documento para su ubicación
                respectiva dentro del sitio web
              </small>
            </CardText>

            {/* Dropdown para seleccionar la etiqueta */}
            <FormGroup className="text-center" style={{ marginTop: "-20px" }}>
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret>{selectedOption}</DropdownToggle>
                <DropdownMenu
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption(
                        "Admisiones - Documentación para Admisión"
                      )
                    }
                  >
                    Admisiones - Documentación para Admisión
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption(
                        "Admisiones - Formulario para inscripción"
                      )
                    }
                  >
                    Admisiones - Formulario para inscripción
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption(
                        "Plan Curricular - Plan Curricular Actual"
                      )
                    }
                  >
                    Plan Curricular - Plan Curricular Actual
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption(
                        "Matrícula - Formulario de Matrícula Ed. Inicial"
                      )
                    }
                  >
                    Matrícula - Formulario de Matrícula Ed. Inicial
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption(
                        "Matrícula - Fechas e Información de Matrícula Ed. Inicial"
                      )
                    }
                  >
                    Matrícula - Fechas e Información de Matrícula Ed. Inicial
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption(
                        "Matrícula - Formulario de Matrícula Ed. Básica"
                      )
                    }
                  >
                    Matrícula - Formulario de Matrícula Ed. Básica
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption(
                        "Matrícula - Fechas e Información de Matrícula Ed. Básica"
                      )
                    }
                  >
                    Matrícula - Fechas e Información de Matrícula Ed. Básica
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption(
                        "Cronograma - Período Planificado Actual"
                      )
                    }
                  >
                    Cronograma - Período Planificado Actual
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption("Cronograma - Calendario de feriados")
                    }
                  >
                    Cronograma - Calendario de feriados
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption("Boletín - Condición Médica")
                    }
                  >
                    Boletín - Condición Médica
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption(
                        "Boletín - Manual de Compromisos y Obligaciones"
                      )
                    }
                  >
                    Boletín - Manual de Compromisos y Obligaciones
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption("Boletín - Instructivo para Matrículas")
                    }
                  >
                    Boletín - Instructivo para Matrículas
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption(
                        "Boletín - Resolución Ministerial de Costos"
                      )
                    }
                  >
                    Boletín - Resolución Ministerial de Costos
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption("Boletín - Reglamento Institucional")
                    }
                  >
                    Boletín - Reglamento Institucional
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption("Boletín - Carta de Solicitud")
                    }
                  >
                    Boletín - Carta de Solicitud
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption(
                        "Horario de Clases - Inicial y Preparatoria"
                      )
                    }
                  >
                    Horario de Clases - Inicial y Preparatoria
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption("Horario de Clases - Básica Elemental")
                    }
                  >
                    Horario de Clases - Básica Elemental
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption("Horario de Clases - Básica Media")
                    }
                  >
                    Horario de Clases - Básica Media
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption("Formato - Justificación de faltas")
                    }
                  >
                    Formato - Justificación de faltas
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption("Formato - Permiso de Salida")
                    }
                  >
                    Formato - Permiso de Salida
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => setSelectedOption("Formato - Correos")}
                  >
                    Formato - Correos
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption(
                        "Horario de Atención - Inicial y Preparatoria"
                      )
                    }
                  >
                    Horario de Atención - Inicial y Preparatoria
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption(
                        "Horario de Atención - Básica Elemental"
                      )
                    }
                  >
                    Horario de Atención - Básica Elemental
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      setSelectedOption("Horario de Atención - Básica Media")
                    }
                  >
                    Horario de Atención - Básica Media
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </FormGroup>

            <FormGroup
              className={`text-center p-5 ${
                file ? "bg-light border-primary" : "bg-white"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: "2px dashed #ccc",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <Input
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="fileInput"
              />
              <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                <p className="mb-2">
                  Arrastra y suelta tu archivo aquí o haz clic para
                  seleccionarlo.
                </p>
                <Button color="primary" tag="span">
                  Seleccionar Archivo
                </Button>
              </label>
              {file && (
                <p className="mt-3">
                  Archivo seleccionado: <strong>{file.name}</strong>
                </p>
              )}
            </FormGroup>
            <div className="text-center mt-3">
              <Button
                type="submit"
                color="success"
                disabled={!file || !selectedOption}
              >
                Subir Archivo
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>

      {/* Modal para mostrar mensajes */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Mensaje</ModalHeader>
        <ModalBody>{modalMessage}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default FileUploadForm;
