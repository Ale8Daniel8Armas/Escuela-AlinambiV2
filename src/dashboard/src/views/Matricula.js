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
  Badge,
} from "reactstrap";

const API = "https://alinambiback.onrender.com/api";

const NIVEL_LABELS = {
  inicial_1: "Inicial 1",
  inicial_2: "Inicial 2",
  preparatoria: "Preparatoria",
  basica_1: "2do EGB",
  basica_2: "3ro EGB",
  basica_3: "4to EGB",
  basica_4: "5to EGB",
  basica_5: "6to EGB",
  basica_6: "7mo EGB",
  basica_7: "8vo EGB",
};

function MatriculaAdminPanel() {
  // ── Estado: costos de matrícula ──────────────────────────────────────────
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

  // ── Estado: lista de formularios de matrícula ────────────────────────────
  const [formularios, setFormularios] = useState([]);
  const [filtroNivel, setFiltroNivel] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [detalleModal, setDetalleModal] = useState(false);
  const [formularioActual, setFormularioActual] = useState(null);
  const [estadoModal, setEstadoModal] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState("aceptado");
  const [observaciones, setObservaciones] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorFormularios, setErrorFormularios] = useState("");

  useEffect(() => {
    fetchMatriculas();
    fetchFormularios();
  }, []);

  // ── Costos: obtener ───────────────────────────────────────────────────────
  const fetchMatriculas = async () => {
    try {
      const response = await axios.get(`${API}/matricula`);
      setMatriculas(response.data);
    } catch {
      setErrorMessage("Error al obtener costos de matrícula.");
    }
  };

  // ── Formularios de matrícula: obtener ─────────────────────────────────────
  const fetchFormularios = async () => {
    try {
      const res = await axios.get(`${API}/solicitud-ingreso`);
      // Solo los enviados desde el formulario formal de matrícula
      setFormularios(res.data.filter((s) => s.esFormularioMatricula === true));
    } catch {
      setErrorFormularios("Error al cargar los formularios de matrícula.");
    }
  };

  // ── Costos: abrir modal edición ───────────────────────────────────────────
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
      setFormData({ type: "inicial", matriculaFee: 0, tuitionFee: 0, requiredDocuments: "", importantDates: "" });
    }
    setEditModal(true);
  };

  const closeEditModal = () => { setEditModal(false); setCurrentMatricula(null); setErrorMessage(""); };
  const openDeleteModal = (m) => { setMatriculaToDelete(m); setDeleteModal(true); };
  const closeDeleteModal = () => { setDeleteModal(false); setMatriculaToDelete(null); };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { type, matriculaFee, tuitionFee, requiredDocuments, importantDates } = formData;
    if (!type || !matriculaFee || !tuitionFee || !requiredDocuments || !importantDates) {
      setErrorMessage("Todos los campos son obligatorios."); return false;
    }
    if (matriculaFee <= 0 || tuitionFee <= 0) {
      setErrorMessage("Los costos deben ser mayores que 0."); return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const data = {
        ...formData,
        requiredDocuments: formData.requiredDocuments.split(",").map((d) => d.trim()).filter(Boolean),
        importantDates: formData.importantDates.split(",").map((d) => d.trim()).filter(Boolean),
      };
      if (currentMatricula) {
        await axios.put(`${API}/matricula/${currentMatricula._id}`, data);
      } else {
        if (matriculas.find((m) => m.type === formData.type)) {
          setErrorMessage("Ya existe una matrícula para este tipo. Edita la existente."); return;
        }
        await axios.post(`${API}/matricula`, data);
      }
      fetchMatriculas();
      closeEditModal();
    } catch {
      setErrorMessage("Error al guardar. Verifica la conexión con el servidor.");
    }
  };

  const handleDelete = async () => {
    if (!matriculaToDelete) return;
    try {
      await axios.delete(`${API}/matriculaDelete/${matriculaToDelete._id}`);
      fetchMatriculas();
      closeDeleteModal();
    } catch {
      setErrorMessage("Error al eliminar matrícula.");
    }
  };

  // ── Formularios de matrícula: acciones ────────────────────────────────────
  const abrirDetalle = (f) => { setFormularioActual(f); setDetalleModal(true); };

  const abrirCambioEstado = (f) => {
    setFormularioActual(f);
    setNuevoEstado(f.estado === "aceptado" ? "aceptado" : "aceptado");
    setObservaciones(f.observaciones || "");
    setEstadoModal(true);
  };

  const handleCambioEstado = async () => {
    try {
      await axios.put(`${API}/solicitud-ingreso/${formularioActual._id}/estado`, {
        estado: nuevoEstado,
        observaciones,
      });
      setSuccessMsg(
        nuevoEstado === "aceptado"
          ? "Estudiante matriculado correctamente."
          : "Formulario rechazado."
      );
      setEstadoModal(false);
      fetchFormularios();
      setTimeout(() => setSuccessMsg(""), 3500);
    } catch {
      setErrorFormularios("Error al actualizar el estado.");
    }
  };

  // ── Filtros ───────────────────────────────────────────────────────────────
  const formulariosFiltrados = formularios.filter((f) => {
    const matchNivel = !filtroNivel || f.nivelSolicitado === filtroNivel;
    const matchBusqueda =
      !busqueda ||
      `${f.nombres} ${f.apellidos}`.toLowerCase().includes(busqueda.toLowerCase()) ||
      f.cedula?.includes(busqueda) ||
      f.referenciaCodigoSolicitud?.toLowerCase().includes(busqueda.toLowerCase());
    return matchNivel && matchBusqueda;
  });

  const matriculados = formulariosFiltrados.filter((f) => f.estado === "aceptado");
  const pendientes   = formulariosFiltrados.filter((f) => f.estado !== "aceptado" && f.estado !== "rechazado");
  const rechazados   = formulariosFiltrados.filter((f) => f.estado === "rechazado");

  const formatFecha = (d) => d ? new Date(d).toLocaleDateString("es-EC") : "—";

  return (
    <>
      <br /><br />
      <div className="content">

        {/* ── Sección 1: Costos de matrícula ─────────────────────────────── */}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Administración de Costos de Matrícula</CardTitle>
                <Button color="primary" onClick={() => openEditModal(null)}>
                  Agregar Nueva Información
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
                    {matriculas.map((m) => (
                      <tr key={m._id}>
                        <td><Badge color="info" pill>{m.type}</Badge></td>
                        <td><strong>${m.matriculaFee}</strong></td>
                        <td><strong>${m.tuitionFee}</strong></td>
                        <td style={{ fontSize: "0.85rem" }}>{m.requiredDocuments.join(", ")}</td>
                        <td style={{ fontSize: "0.85rem" }}>{m.importantDates.join(", ")}</td>
                        <td>
                          <Button size="sm" color="info" onClick={() => openEditModal(m)} className="mr-1">
                            Editar
                          </Button>
                          <Button size="sm" color="danger" onClick={() => openDeleteModal(m)}>
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {matriculas.length === 0 && (
                      <tr><td colSpan="6" className="text-center text-muted py-3">Sin datos configurados.</td></tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* ── Sección 2: Formularios pendientes de aprobación ────────────── */}
        <Row className="mt-2">
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  <i className="nc-icon nc-time-alarm mr-2" style={{ color: "#f39c12" }} />
                  Formularios de Matrícula Pendientes
                  {pendientes.length > 0 && (
                    <Badge color="warning" pill className="ml-2">{pendientes.length}</Badge>
                  )}
                </CardTitle>
                <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
                  Estudiantes que completaron el formulario de matrícula y esperan aprobación.
                </p>
              </CardHeader>
              <CardBody>
                {successMsg && <Alert color="success">{successMsg}</Alert>}
                {errorFormularios && <Alert color="danger">{errorFormularios}</Alert>}
                <Table responsive hover>
                  <thead className="text-primary">
                    <tr>
                      <th>Referencia</th>
                      <th>Estudiante</th>
                      <th>Cédula</th>
                      <th>Nivel</th>
                      <th>Representante</th>
                      <th>Celular</th>
                      <th>Fecha Envío</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendientes.map((f) => (
                      <tr key={f._id}>
                        <td>
                          <code style={{ fontSize: "0.78rem" }}>{f.referenciaCodigoSolicitud || "—"}</code>
                        </td>
                        <td><strong>{f.nombres} {f.apellidos}</strong></td>
                        <td>{f.cedula || "—"}</td>
                        <td>{NIVEL_LABELS[f.nivelSolicitado] || f.nivelSolicitado}</td>
                        <td>{f.nombresRepresentante} {f.apellidosRepresentante}</td>
                        <td>{f.celularRepresentante}</td>
                        <td>{formatFecha(f.fechaSolicitud)}</td>
                        <td>
                          <Button size="sm" color="info" title="Ver detalle" onClick={() => abrirDetalle(f)} className="mr-1 mb-1">
                            <i className="nc-icon nc-zoom-split" />
                          </Button>
                          <Button size="sm" color="success" title="Aprobar matrícula" onClick={() => { setFormularioActual(f); setNuevoEstado("aceptado"); setObservaciones(""); setEstadoModal(true); }} className="mr-1 mb-1">
                            <i className="nc-icon nc-check-2" />
                          </Button>
                          <Button size="sm" color="danger" title="Rechazar" onClick={() => { setFormularioActual(f); setNuevoEstado("rechazado"); setObservaciones(""); setEstadoModal(true); }} className="mb-1">
                            <i className="nc-icon nc-simple-remove" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {pendientes.length === 0 && (
                      <tr><td colSpan="8" className="text-center text-muted py-3">No hay formularios pendientes.</td></tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* ── Sección 3: Lista de Matriculados ───────────────────────────── */}
        <Row className="mt-2">
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  <i className="nc-icon nc-check-2 mr-2" style={{ color: "#27ae60" }} />
                  Lista de Estudiantes Matriculados
                  <Badge color="success" pill className="ml-2">{matriculados.length}</Badge>
                </CardTitle>
                {/* Filtros */}
                <Row className="mt-2">
                  <Col md="5">
                    <Input
                      type="text"
                      placeholder="Buscar por nombre, cédula o código..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      bsSize="sm"
                    />
                  </Col>
                  <Col md="3">
                    <Input
                      type="select"
                      value={filtroNivel}
                      onChange={(e) => setFiltroNivel(e.target.value)}
                      bsSize="sm"
                    >
                      <option value="">Todos los niveles</option>
                      {Object.entries(NIVEL_LABELS).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
                      ))}
                    </Input>
                  </Col>
                  <Col md="4" className="text-right">
                    <small className="text-muted">
                      Mostrando <strong>{matriculados.length}</strong> matriculado(s)
                      {rechazados.length > 0 && (
                        <span> · <span className="text-danger">{rechazados.length} rechazado(s)</span></span>
                      )}
                    </small>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead style={{ backgroundColor: "#e8f5e9" }}>
                    <tr>
                      <th style={{ color: "#2e7d32" }}>#</th>
                      <th style={{ color: "#2e7d32" }}>Ref. Solicitud</th>
                      <th style={{ color: "#2e7d32" }}>Estudiante</th>
                      <th style={{ color: "#2e7d32" }}>Cédula</th>
                      <th style={{ color: "#2e7d32" }}>Nivel</th>
                      <th style={{ color: "#2e7d32" }}>Año Lectivo</th>
                      <th style={{ color: "#2e7d32" }}>Representante</th>
                      <th style={{ color: "#2e7d32" }}>Celular</th>
                      <th style={{ color: "#2e7d32" }}>Fecha Matrícula</th>
                      <th style={{ color: "#2e7d32" }}>Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matriculados.map((f, idx) => (
                      <tr key={f._id} style={{ backgroundColor: idx % 2 === 0 ? "#f9fff9" : "#ffffff" }}>
                        <td>
                          <Badge color="success" pill>{idx + 1}</Badge>
                        </td>
                        <td>
                          <code style={{ fontSize: "0.78rem", color: "#9CC066" }}>
                            {f.referenciaCodigoSolicitud || "—"}
                          </code>
                        </td>
                        <td>
                          <strong>{f.nombres} {f.apellidos}</strong>
                        </td>
                        <td>{f.cedula || "—"}</td>
                        <td>
                          <Badge color="info" pill style={{ fontSize: "0.75rem" }}>
                            {NIVEL_LABELS[f.nivelSolicitado] || f.nivelSolicitado}
                          </Badge>
                        </td>
                        <td>{f.anoLectivo}</td>
                        <td>{f.nombresRepresentante} {f.apellidosRepresentante}</td>
                        <td>{f.celularRepresentante}</td>
                        <td>
                          <small>{formatFecha(f.fechaSolicitud)}</small>
                        </td>
                        <td>
                          <Button size="sm" color="success" outline onClick={() => abrirDetalle(f)}>
                            <i className="nc-icon nc-zoom-split" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {matriculados.length === 0 && (
                      <tr>
                        <td colSpan="10" className="text-center py-4">
                          <i className="nc-icon nc-single-02" style={{ fontSize: "2rem", color: "#ccc", display: "block", marginBottom: "8px" }} />
                          <span className="text-muted">
                            {busqueda || filtroNivel
                              ? "No hay matriculados que coincidan con la búsqueda."
                              : "Aún no hay estudiantes matriculados. Los formularios aprobados aparecerán aquí."}
                          </span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                {/* Resumen por nivel */}
                {matriculados.length > 0 && (
                  <div className="mt-3 pt-3" style={{ borderTop: "1px solid #eee" }}>
                    <small className="text-muted font-weight-bold">Resumen por nivel:</small>
                    <div className="d-flex flex-wrap mt-1" style={{ gap: "8px" }}>
                      {Object.entries(NIVEL_LABELS).map(([val, label]) => {
                        const count = matriculados.filter((f) => f.nivelSolicitado === val).length;
                        if (!count) return null;
                        return (
                          <Badge key={val} color="success" style={{ fontSize: "0.8rem", padding: "5px 10px" }}>
                            {label}: {count}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {/* ── Modal costos: edición ─────────────────────────────────────────── */}
      <Modal isOpen={editModal} toggle={closeEditModal}>
        <ModalHeader toggle={closeEditModal}>
          {currentMatricula ? "Editar Costos" : "Agregar Nueva Información para Matrícula"}
        </ModalHeader>
        <ModalBody>
          {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
          <Form>
            <FormGroup>
              <Label>Tipo</Label>
              <Input type="select" name="type" value={formData.type} onChange={handleChange}>
                <option value="inicial">Educación Inicial</option>
                <option value="basica">Educación Básica</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Costo de Matrícula</Label>
              <Input type="number" name="matriculaFee" value={formData.matriculaFee} onChange={handleChange} min="1" />
            </FormGroup>
            <FormGroup>
              <Label>Costo de Pensión</Label>
              <Input type="number" name="tuitionFee" value={formData.tuitionFee} onChange={handleChange} min="1" />
            </FormGroup>
            <FormGroup>
              <Label>Documentos Requeridos</Label>
              <Input type="text" name="requiredDocuments" value={formData.requiredDocuments} onChange={handleChange} placeholder="Separar por comas" />
            </FormGroup>
            <FormGroup>
              <Label>Fechas Importantes</Label>
              <Input type="text" name="importantDates" value={formData.importantDates} onChange={handleChange} placeholder="Separar por comas" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Guardar</Button>{" "}
          <Button color="secondary" onClick={closeEditModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      {/* ── Modal costos: confirmar eliminación ──────────────────────────── */}
      <Modal isOpen={deleteModal} toggle={closeDeleteModal}>
        <ModalHeader toggle={closeDeleteModal}>Confirmar Eliminación</ModalHeader>
        <ModalBody>
          ¿Eliminar la información de matrícula tipo <strong>{matriculaToDelete?.type}</strong>?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>Eliminar</Button>{" "}
          <Button color="secondary" onClick={closeDeleteModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      {/* ── Modal: detalle de formulario de matrícula ────────────────────── */}
      <Modal isOpen={detalleModal} toggle={() => setDetalleModal(false)} size="lg">
        <ModalHeader toggle={() => setDetalleModal(false)}>
          Detalle — {formularioActual?.nombres} {formularioActual?.apellidos}
          <Badge
            color={formularioActual?.estado === "aceptado" ? "success" : formularioActual?.estado === "rechazado" ? "danger" : "warning"}
            pill
            className="ml-2"
          >
            {formularioActual?.estado}
          </Badge>
        </ModalHeader>
        <ModalBody>
          {formularioActual && (
            <Row>
              <Col md="6">
                <p className="mb-1"><strong>Ref. solicitud:</strong> <code>{formularioActual.referenciaCodigoSolicitud || "—"}</code></p>
                <p className="mb-1"><strong>Cédula:</strong> {formularioActual.cedula || "—"}</p>
                <p className="mb-1"><strong>Fecha de nacimiento:</strong> {formatFecha(formularioActual.fechaNacimiento)}</p>
                <p className="mb-1"><strong>Género:</strong> {formularioActual.genero}</p>
                <p className="mb-1"><strong>Nivel:</strong> {NIVEL_LABELS[formularioActual.nivelSolicitado] || formularioActual.nivelSolicitado}</p>
                <p className="mb-1"><strong>Año lectivo:</strong> {formularioActual.anoLectivo}</p>
              </Col>
              <Col md="6">
                <p className="mb-1"><strong>Representante:</strong> {formularioActual.nombresRepresentante} {formularioActual.apellidosRepresentante}</p>
                <p className="mb-1"><strong>Cédula rep.:</strong> {formularioActual.cedulaRepresentante}</p>
                <p className="mb-1"><strong>Celular:</strong> {formularioActual.celularRepresentante}</p>
                <p className="mb-1"><strong>Email:</strong> {formularioActual.emailRepresentante}</p>
                <p className="mb-1"><strong>Dirección:</strong> {formularioActual.direccion || "—"}</p>
                <p className="mb-1"><strong>Fecha envío:</strong> {formatFecha(formularioActual.fechaSolicitud)}</p>
              </Col>
              {formularioActual.observaciones && (
                <Col md="12" className="mt-3">
                  <div style={{ background: "#f8f9fa", borderRadius: "8px", padding: "12px" }}>
                    <strong>Observaciones:</strong>
                    <p className="mb-0 mt-1 text-muted">{formularioActual.observaciones}</p>
                  </div>
                </Col>
              )}
            </Row>
          )}
        </ModalBody>
        <ModalFooter>
          {formularioActual?.estado !== "aceptado" && (
            <Button color="success" onClick={() => { setDetalleModal(false); abrirCambioEstado(formularioActual); }}>
              Aprobar Matrícula
            </Button>
          )}
          <Button color="secondary" onClick={() => setDetalleModal(false)}>Cerrar</Button>
        </ModalFooter>
      </Modal>

      {/* ── Modal: cambio de estado ───────────────────────────────────────── */}
      <Modal isOpen={estadoModal} toggle={() => setEstadoModal(false)}>
        <ModalHeader toggle={() => setEstadoModal(false)}>
          {nuevoEstado === "aceptado" ? "✅ Aprobar Matrícula" : "❌ Rechazar Formulario"}
        </ModalHeader>
        <ModalBody>
          <p>
            Estudiante: <strong>{formularioActual?.nombres} {formularioActual?.apellidos}</strong>
            <br />
            Nivel: <strong>{NIVEL_LABELS[formularioActual?.nivelSolicitado] || formularioActual?.nivelSolicitado}</strong>
          </p>
          <Form>
            <FormGroup>
              <Label>Estado</Label>
              <Input type="select" value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)}>
                <option value="aceptado">Aprobar — Matriculado</option>
                <option value="rechazado">Rechazar</option>
                <option value="en_revision">En Revisión</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Observaciones <small className="text-muted">(opcional)</small></Label>
              <Input
                type="textarea"
                rows="3"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                placeholder="Notas internas o motivo de rechazo..."
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color={nuevoEstado === "aceptado" ? "success" : "danger"} onClick={handleCambioEstado}>
            {nuevoEstado === "aceptado" ? "Confirmar Matrícula" : "Rechazar"}
          </Button>
          <Button color="secondary" onClick={() => setEstadoModal(false)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default MatriculaAdminPanel;
