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

const ESTADO_COLORES = {
  pendiente: "warning",
  en_revision: "info",
  aceptado: "success",
  rechazado: "danger",
};

const ESTADO_LABELS = {
  pendiente: "Pendiente",
  en_revision: "En Revisión",
  aceptado: "Aceptado",
  rechazado: "Rechazado",
};

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

function SolicitudIngresoAdmin() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [stats, setStats] = useState({});
  const [filtroEstado, setFiltroEstado] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const [detailModal, setDetailModal] = useState(false);
  const [estadoModal, setEstadoModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [solicitudActual, setSolicitudActual] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetchSolicitudes();
    fetchStats();
  }, []);

  useEffect(() => {
    fetchSolicitudes();
  }, [filtroEstado]);

  const fetchSolicitudes = async () => {
    try {
      const params = filtroEstado ? { estado: filtroEstado } : {};
      const res = await axios.get(`${API}/solicitud-ingreso`, { params });
      setSolicitudes(res.data);
    } catch {
      setErrorMsg("Error al cargar las solicitudes.");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API}/solicitud-ingreso/estadisticas`);
      setStats(res.data);
    } catch {
      // stats no críticas
    }
  };

  const abrirDetalle = (s) => {
    setSolicitudActual(s);
    setDetailModal(true);
  };

  const abrirCambioEstado = (s) => {
    setSolicitudActual(s);
    setNuevoEstado(s.estado);
    setObservaciones(s.observaciones || "");
    setEstadoModal(true);
  };

  const abrirDelete = (s) => {
    setSolicitudActual(s);
    setDeleteModal(true);
  };

  const handleCambioEstado = async () => {
    if (!nuevoEstado) { setErrorMsg("Selecciona un estado."); return; }
    try {
      await axios.put(`${API}/solicitud-ingreso/${solicitudActual._id}/estado`, {
        estado: nuevoEstado,
        observaciones,
      });
      setSuccessMsg("Estado actualizado correctamente.");
      setEstadoModal(false);
      fetchSolicitudes();
      fetchStats();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch {
      setErrorMsg("Error al actualizar el estado.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/solicitud-ingreso/${solicitudActual._id}`);
      setSuccessMsg("Solicitud eliminada.");
      setDeleteModal(false);
      fetchSolicitudes();
      fetchStats();
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch {
      setErrorMsg("Error al eliminar la solicitud.");
    }
  };

  const solicitudesFiltradas = solicitudes.filter((s) => {
    if (!busqueda) return true;
    const q = busqueda.toLowerCase();
    return (
      s.codigoSolicitud?.toLowerCase().includes(q) ||
      s.nombres?.toLowerCase().includes(q) ||
      s.apellidos?.toLowerCase().includes(q) ||
      s.emailRepresentante?.toLowerCase().includes(q)
    );
  });

  const formatFecha = (d) =>
    d ? new Date(d).toLocaleDateString("es-EC") : "—";

  return (
    <>
      <br />
      <br />
      <div className="content">

        {/* Tarjetas de estadísticas */}
        <Row className="mb-4">
          {[
            { label: "Total", key: "total", color: "#17174A", icon: "nc-paper" },
            { label: "Pendientes", key: "pendientes", color: "#f39c12", icon: "nc-time-alarm" },
            { label: "En Revisión", key: "en_revision", color: "#3498db", icon: "nc-zoom-split" },
            { label: "Aceptados", key: "aceptados", color: "#27ae60", icon: "nc-check-2" },
            { label: "Rechazados", key: "rechazados", color: "#e74c3c", icon: "nc-simple-remove" },
          ].map((item) => (
            <Col key={item.key} xs="6" md="4" lg="2" className="mb-3">
              <Card
                className="text-center shadow-sm"
                style={{
                  borderTop: `4px solid ${item.color}`,
                  borderRadius: "12px",
                }}
              >
                <CardBody style={{ padding: "16px 8px" }}>
                  <i
                    className={`nc-icon ${item.icon}`}
                    style={{ fontSize: "1.6rem", color: item.color }}
                  />
                  <h4
                    style={{
                      fontWeight: "800",
                      color: item.color,
                      margin: "8px 0 2px",
                      fontSize: "1.8rem",
                    }}
                  >
                    {stats[item.key] ?? "—"}
                  </h4>
                  <small style={{ color: "#777" }}>{item.label}</small>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Tabla principal */}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Solicitudes de Ingreso</CardTitle>
                <Row className="mt-2">
                  <Col md="4">
                    <Input
                      type="text"
                      placeholder="Buscar por código, nombre o email..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                  </Col>
                  <Col md="3">
                    <Input
                      type="select"
                      value={filtroEstado}
                      onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                      <option value="">Todos los estados</option>
                      <option value="pendiente">Pendiente</option>
                      <option value="en_revision">En Revisión</option>
                      <option value="aceptado">Aceptado</option>
                      <option value="rechazado">Rechazado</option>
                    </Input>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {errorMsg && (
                  <Alert color="danger" toggle={() => setErrorMsg("")}>
                    {errorMsg}
                  </Alert>
                )}
                {successMsg && (
                  <Alert color="success">{successMsg}</Alert>
                )}
                <Table responsive hover>
                  <thead className="text-primary">
                    <tr>
                      <th>Código</th>
                      <th>Estudiante</th>
                      <th>Nivel</th>
                      <th>Representante</th>
                      <th>Celular</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitudesFiltradas.length === 0 && (
                      <tr>
                        <td
                          colSpan="8"
                          className="text-center text-muted py-4"
                        >
                          No hay solicitudes que coincidan.
                        </td>
                      </tr>
                    )}
                    {solicitudesFiltradas.map((s) => (
                      <tr key={s._id}>
                        <td>
                          <code style={{ fontSize: "0.8rem" }}>
                            {s.codigoSolicitud}
                          </code>
                        </td>
                        <td>
                          <strong>
                            {s.nombres} {s.apellidos}
                          </strong>
                        </td>
                        <td>{NIVEL_LABELS[s.nivelSolicitado] || s.nivelSolicitado}</td>
                        <td>
                          {s.nombresRepresentante} {s.apellidosRepresentante}
                        </td>
                        <td>{s.celularRepresentante}</td>
                        <td>{formatFecha(s.fechaSolicitud)}</td>
                        <td>
                          <Badge color={ESTADO_COLORES[s.estado]} pill>
                            {ESTADO_LABELS[s.estado]}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            color="info"
                            title="Ver detalle"
                            onClick={() => abrirDetalle(s)}
                            className="mr-1 mb-1"
                          >
                            <i className="nc-icon nc-zoom-split" />
                          </Button>
                          <Button
                            size="sm"
                            color="warning"
                            title="Cambiar estado"
                            onClick={() => abrirCambioEstado(s)}
                            className="mr-1 mb-1"
                          >
                            <i className="nc-icon nc-settings-gear-64" />
                          </Button>
                          <Button
                            size="sm"
                            color="danger"
                            title="Eliminar"
                            onClick={() => abrirDelete(s)}
                            className="mb-1"
                          >
                            <i className="nc-icon nc-simple-remove" />
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

      {/* Modal de detalle */}
      <Modal
        isOpen={detailModal}
        toggle={() => setDetailModal(false)}
        size="lg"
      >
        <ModalHeader toggle={() => setDetailModal(false)}>
          Detalle de Solicitud —{" "}
          <span style={{ color: "#9CC066" }}>
            {solicitudActual?.codigoSolicitud}
          </span>
        </ModalHeader>
        <ModalBody>
          {solicitudActual && (
            <DetalleSolicitud s={solicitudActual} />
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setDetailModal(false)}>
            Cerrar
          </Button>
          <Button
            color="warning"
            onClick={() => {
              setDetailModal(false);
              abrirCambioEstado(solicitudActual);
            }}
          >
            Cambiar Estado
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal de cambio de estado */}
      <Modal isOpen={estadoModal} toggle={() => setEstadoModal(false)}>
        <ModalHeader toggle={() => setEstadoModal(false)}>
          Actualizar Estado — {solicitudActual?.codigoSolicitud}
        </ModalHeader>
        <ModalBody>
          {errorMsg && <Alert color="danger">{errorMsg}</Alert>}
          <Form>
            <FormGroup>
              <Label>Estado</Label>
              <Input
                type="select"
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value)}
              >
                <option value="pendiente">Pendiente</option>
                <option value="en_revision">En Revisión</option>
                <option value="aceptado">Aceptado</option>
                <option value="rechazado">Rechazado</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Observaciones</Label>
              <Input
                type="textarea"
                rows="4"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                placeholder="Notas internas sobre esta solicitud..."
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCambioEstado}>
            Guardar Cambios
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setEstadoModal(false);
              setErrorMsg("");
            }}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
        <ModalHeader toggle={() => setDeleteModal(false)}>
          Confirmar Eliminación
        </ModalHeader>
        <ModalBody>
          ¿Estás seguro de que deseas eliminar la solicitud{" "}
          <strong>{solicitudActual?.codigoSolicitud}</strong> de{" "}
          <strong>
            {solicitudActual?.nombres} {solicitudActual?.apellidos}
          </strong>
          ? Esta acción no se puede deshacer.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Eliminar
          </Button>
          <Button color="secondary" onClick={() => setDeleteModal(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

// Componente para mostrar el detalle completo de la solicitud
function DetalleSolicitud({ s }) {
  const seccion = (titulo, icono) => (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        padding: "10px 16px",
        marginBottom: "12px",
        fontWeight: "700",
        color: "#17174A",
        fontSize: "0.85rem",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      }}
    >
      <i className={`nc-icon ${icono} mr-2`} />
      {titulo}
    </div>
  );

  const fila = (label, valor) => (
    <Row
      key={label}
      style={{ padding: "6px 0", borderBottom: "1px solid #f0f0f0" }}
    >
      <Col xs="5">
        <small style={{ color: "#888", fontWeight: "600" }}>{label}</small>
      </Col>
      <Col xs="7">
        <small style={{ color: "#333" }}>{valor || "—"}</small>
      </Col>
    </Row>
  );

  return (
    <>
      <Row className="mb-3">
        <Col xs="6">
          <Badge color={ESTADO_COLORES[s.estado]} pill style={{ fontSize: "0.9rem", padding: "6px 14px" }}>
            {ESTADO_LABELS[s.estado]}
          </Badge>
        </Col>
        <Col xs="6" className="text-right">
          <small style={{ color: "#888" }}>
            {new Date(s.fechaSolicitud).toLocaleString("es-EC")}
          </small>
        </Col>
      </Row>

      {seccion("Datos del Estudiante", "nc-single-02")}
      {fila("Nombres", `${s.nombres} ${s.apellidos}`)}
      {fila("Cédula / Pasaporte", s.cedula)}
      {fila("Fecha de Nacimiento", s.fechaNacimiento ? new Date(s.fechaNacimiento).toLocaleDateString("es-EC") : "")}
      {fila("Género", s.genero)}
      {fila("Lugar de Nacimiento", s.lugarNacimiento)}
      {fila("Nacionalidad / Etnia", `${s.nacionalidad} / ${s.etnia}`)}
      {fila("Dirección", s.direccion)}
      {fila("Barrio", s.barrio)}
      {s.tieneDiscapacidad && fila("Discapacidad", `${s.tipoDiscapacidad} (${s.porcentajeDiscapacidad}%)`)}
      {s.condicionMedica && fila("Condición Médica", s.condicionMedica)}

      {seccion("Información Académica", "nc-hat-3")}
      {fila("Nivel Solicitado", NIVEL_LABELS[s.nivelSolicitado] || s.nivelSolicitado)}
      {fila("Año Lectivo", s.anoLectivo)}
      {fila("Institución Anterior", s.institucionAnterior)}
      {fila("Motivo de Cambio", s.motivoCambio)}

      {seccion("Representante Legal", "nc-badge")}
      {fila("Parentesco", s.parentescoRepresentante)}
      {fila("Nombres", `${s.nombresRepresentante} ${s.apellidosRepresentante}`)}
      {fila("Cédula", s.cedulaRepresentante)}
      {fila("Ocupación", s.ocupacionRepresentante)}
      {fila("Teléfono", s.telefonoRepresentante)}
      {fila("Celular", s.celularRepresentante)}
      {fila("Email", s.emailRepresentante)}

      {(s.nombresPadre || s.nombresMadre) && seccion("Datos de los Padres", "nc-circle-09")}
      {s.nombresPadre && fila("Padre", `${s.nombresPadre} ${s.apellidosPadre} — ${s.telefonoPadre}`)}
      {s.nombresMadre && fila("Madre", `${s.nombresMadre} ${s.apellidosMadre} — ${s.telefonoMadre}`)}

      {seccion("Contacto de Emergencia", "nc-bell-55")}
      {fila("Nombre", s.nombreEmergencia)}
      {fila("Parentesco", s.parentescoEmergencia)}
      {fila("Teléfono", s.telefonoEmergencia)}

      {s.observaciones && (
        <>
          {seccion("Observaciones Administrativas", "nc-notes")}
          <p style={{ color: "#555", fontSize: "0.9rem", padding: "8px 0" }}>
            {s.observaciones}
          </p>
        </>
      )}
    </>
  );
}

export default SolicitudIngresoAdmin;
