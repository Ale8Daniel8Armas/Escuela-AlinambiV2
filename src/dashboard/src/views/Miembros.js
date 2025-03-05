import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Table,
  Alert,
} from "reactstrap";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

function TeamMemberManager() {
  //Estados para la gestión de los miembros del consejo estudiantil
  const [teamMembers, setTeamMembers] = useState([]);
  const [newTeamMember, setNewTeamMember] = useState({
    file: null,
    name: "",
    role: "",
    description: "",
  });
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  //Estados para la gestión de la foto de las docentes
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    file: null,
    description: "",
  });
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [teacherErrorMessage, setTeacherErrorMessage] = useState("");

  // Formatos de imagen permitidos
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

  useEffect(() => {
    fetchTeamMembers();
    fetchTeachers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(
        "https://alinambiback.onrender.com/api/members"
      );
      setTeamMembers(response.data);
    } catch (error) {}
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        "https://alinambiback.onrender.com/api/teachersPic"
      );
      setTeachers(response.data);
    } catch (error) {}
  };

  const validateImageFile = (file) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return false;
    }
    return true;
  };

  const handleTeamMemberUpload = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Validar que no se exceda el límite de 4 miembros
    if (teamMembers.length >= 4) {
      setErrorMessage("No se pueden agregar más de 4 miembros.");
      return;
    }

    // Validar que se haya subido una imagen
    if (!newTeamMember.file) {
      setErrorMessage("Debes subir una imagen.");
      return;
    }

    // Validar que el archivo sea una imagen
    if (!validateImageFile(newTeamMember.file)) {
      setErrorMessage("Solo se permiten archivos de imagen (JPEG, PNG, GIF).");
      return;
    }

    // Validar que la imagen no esté repetida
    const isImageRepeated = teamMembers.some(
      (member) => member.filename === newTeamMember.file.name
    );
    if (isImageRepeated) {
      setErrorMessage("La imagen ya ha sido subida.");
      return;
    }

    const formData = new FormData();
    formData.append("image", newTeamMember.file);
    formData.append("name", newTeamMember.name);
    formData.append("role", newTeamMember.role);
    formData.append("description", newTeamMember.description);

    try {
      const response = await axios.post(
        "https://alinambiback.onrender.com/api/uploadMember",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTeamMembers([...teamMembers, response.data]);
      setNewTeamMember({ file: null, name: "", role: "", description: "" });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error al crear el miembro.");
    }
  };

  const handleEditTeamMember = async () => {
    try {
      const response = await axios.put(
        `https://alinambiback.onrender.com/api/editMember/${editingTeamMember._id}`,
        {
          name: editingTeamMember.name,
          role: editingTeamMember.role,
          description: editingTeamMember.description,
        }
      );
      const updatedTeamMembers = teamMembers.map((member) =>
        member._id === editingTeamMember._id ? response.data : member
      );
      setTeamMembers(updatedTeamMembers);
      setEditingTeamMember(null);
    } catch (error) {}
  };

  const handleDeleteTeamMember = async (id) => {
    try {
      await axios.delete(
        `https://alinambiback.onrender.com/api/deleteMember/${id}`
      );
      const updatedTeamMembers = teamMembers.filter(
        (member) => member._id !== id
      );
      setTeamMembers(updatedTeamMembers);
    } catch (error) {}
  };

  //Para la gestión de la foto de los docentes
  const handleTeacherUpload = async (e) => {
    e.preventDefault();
    setTeacherErrorMessage("");

    if (!newTeacher.file) {
      setTeacherErrorMessage("Debes subir una imagen.");
      return;
    }

    // Validar que el archivo sea una imagen
    if (!validateImageFile(newTeacher.file)) {
      setTeacherErrorMessage(
        "Solo se permiten archivos de imagen (JPEG, PNG, GIF)."
      );
      return;
    }

    // Validar que no se exceda el límite de más imágenes
    if (teachers.length >= 1) {
      setTeacherErrorMessage("Solo se permite cargar una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("imageTeachers", newTeacher.file);
    formData.append("description", newTeacher.description);

    try {
      const response = await axios.post(
        "https://alinambiback.onrender.com/api/uploadTeachersMembersPic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setTeachers([...teachers, response.data]);
      setNewTeacher({ file: null, description: "" });
      setTeacherErrorMessage("");
    } catch (error) {
      setTeacherErrorMessage("Error al subir la imagen del docente.");
    }
  };

  const handleEditTeacher = async () => {
    try {
      const formData = new FormData();
      if (editingTeacher.file) {
        formData.append("imageTeachers", editingTeacher.file);
      }
      formData.append("description", editingTeacher.description);

      const response = await axios.put(
        `https://alinambiback.onrender.com/api/editTeachersPic/${editingTeacher._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedTeachers = teachers.map((teacher) =>
        teacher._id === editingTeacher._id ? response.data : teacher
      );
      setTeachers(updatedTeachers);
      setEditingTeacher(null);
    } catch (error) {}
  };

  const handleDeleteTeacher = async (id) => {
    try {
      await axios.delete(
        `https://alinambiback.onrender.com/api/deleteTeachersPic/${id}`
      );
      const updatedTeachers = teachers.filter((teacher) => teacher._id !== id);
      setTeachers(updatedTeachers);
    } catch (error) {}
  };

  const handleFileChange = (e) => {
    setNewTeacher({ ...newTeacher, file: e.target.files[0] });
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
                  Gestión de Miembros del Consejo Estudiantil
                </CardTitle>
                <p className="card-category">
                  Sube, edita y gestiona los miembros del consejo estudiantil.
                </p>
              </CardHeader>
              <CardBody>
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                {/* Formulario para crear miembros */}
                <Form onSubmit={handleTeamMemberUpload}>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <label>Nombre</label>
                        <Input
                          type="text"
                          value={newTeamMember.name}
                          onChange={(e) =>
                            setNewTeamMember({
                              ...newTeamMember,
                              name: e.target.value,
                            })
                          }
                          placeholder="Nombre"
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <label>Rol</label>
                        <Input
                          type="text"
                          value={newTeamMember.role}
                          onChange={(e) =>
                            setNewTeamMember({
                              ...newTeamMember,
                              role: e.target.value,
                            })
                          }
                          placeholder="Rol"
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <label>Descripción</label>
                        <Input
                          type="text"
                          value={newTeamMember.description}
                          onChange={(e) =>
                            setNewTeamMember({
                              ...newTeamMember,
                              description: e.target.value,
                            })
                          }
                          placeholder="Descripción"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <label>Subir imagen</label>
                        <Input
                          type="file"
                          onChange={(e) =>
                            setNewTeamMember({
                              ...newTeamMember,
                              file: e.target.files[0],
                            })
                          }
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button color="primary" type="submit">
                    Crear Miembro
                  </Button>
                </Form>

                {/* Tabla para mostrar los miembros */}
                <Table className="mt-4">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Rol</th>
                      <th>Descripción</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member._id}>
                        <td>
                          <img
                            src={`https://alinambiback.onrender.com/api/member-images/${member.filename}`}
                            alt={member.name}
                            style={{ width: "100px", height: "auto" }}
                          />
                        </td>
                        <td>
                          {editingTeamMember?._id === member._id ? (
                            <Input
                              type="text"
                              value={editingTeamMember.name}
                              onChange={(e) =>
                                setEditingTeamMember({
                                  ...editingTeamMember,
                                  name: e.target.value,
                                })
                              }
                            />
                          ) : (
                            member.name
                          )}
                        </td>
                        <td>
                          {editingTeamMember?._id === member._id ? (
                            <Input
                              type="text"
                              value={editingTeamMember.role}
                              onChange={(e) =>
                                setEditingTeamMember({
                                  ...editingTeamMember,
                                  role: e.target.value,
                                })
                              }
                            />
                          ) : (
                            member.role
                          )}
                        </td>
                        <td>
                          {editingTeamMember?._id === member._id ? (
                            <Input
                              type="text"
                              value={editingTeamMember.description}
                              onChange={(e) =>
                                setEditingTeamMember({
                                  ...editingTeamMember,
                                  description: e.target.value,
                                })
                              }
                            />
                          ) : (
                            member.description
                          )}
                        </td>
                        <td>
                          {editingTeamMember?._id === member._id ? (
                            <Button
                              color="success"
                              onClick={handleEditTeamMember}
                              className="mr-2"
                            >
                              Guardar
                            </Button>
                          ) : (
                            <Button
                              color="info"
                              onClick={() => setEditingTeamMember(member)}
                              className="mr-2"
                            >
                              Editar
                            </Button>
                          )}
                          <Button
                            color="danger"
                            onClick={() => handleDeleteTeamMember(member._id)}
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

        {/* Card 2: Formulario para la subida de foto de las o los docentes y su descripción */}
        <Card className="mt-4" style={{ maxWidth: "92%", marginLeft: "4%" }}>
          <CardBody>
            <CardTitle tag="h4" className="text-center mb-4">
              <FaCloudUploadAlt size={30} className="mr-2" />
              Gestión de Imágenes y Descripciones de Docentes
            </CardTitle>
            <p className="text-center text-muted">
              Gestión de la imagen y descripción de la imagen de los docentes
              para el período actual.
            </p>
            {teacherErrorMessage && (
              <Alert color="danger">{teacherErrorMessage}</Alert>
            )}
            <Form onSubmit={handleTeacherUpload}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>Descripción</label>
                    <Input
                      type="text"
                      value={newTeacher.description}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          description: e.target.value,
                        })
                      }
                      placeholder="Descripción de la imagen de los docentes"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label>Subir imagen</label>
                    <Input type="file" onChange={handleFileChange} required />
                  </FormGroup>
                </Col>
              </Row>
              <Button color="primary" type="submit">
                Subir Imagen
              </Button>
            </Form>
            {/* Tabla para mostrar las imágenes y descripciones de los docentes */}
            <Table className="mt-4">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher._id}>
                    <td>
                      <img
                        src={`https://alinambiback.onrender.com/api/teacher-images/${teacher.filename}`}
                        alt={teacher.description}
                        style={{ width: "100px", height: "auto" }}
                      />
                    </td>
                    <td>
                      {editingTeacher?._id === teacher._id ? (
                        <Input
                          type="text"
                          value={editingTeacher.description}
                          onChange={(e) =>
                            setEditingTeacher({
                              ...editingTeacher,
                              description: e.target.value,
                            })
                          }
                        />
                      ) : (
                        teacher.description
                      )}
                    </td>
                    <td>
                      {editingTeacher?._id === teacher._id ? (
                        <Button
                          color="success"
                          onClick={handleEditTeacher}
                          className="mr-2"
                        >
                          Guardar
                        </Button>
                      ) : (
                        <Button
                          color="info"
                          onClick={() => setEditingTeacher(teacher)}
                          className="mr-2"
                        >
                          Editar
                        </Button>
                      )}
                      <Button
                        color="danger"
                        onClick={() => handleDeleteTeacher(teacher._id)}
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
      </div>
    </>
  );
}

export default TeamMemberManager;
