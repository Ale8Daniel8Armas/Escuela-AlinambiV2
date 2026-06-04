import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  Progress,
} from "reactstrap";

import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

const API = "https://alinambiback.onrender.com/api";

const NIVELES = [
  { value: "inicial_1", label: "Inicial 1 (2-3 años)" },
  { value: "inicial_2", label: "Inicial 2 (3-4 años)" },
  { value: "preparatoria", label: "Preparatoria (1ro EGB)" },
  { value: "basica_1", label: "2do Año EGB" },
  { value: "basica_2", label: "3ro Año EGB" },
  { value: "basica_3", label: "4to Año EGB" },
  { value: "basica_4", label: "5to Año EGB" },
  { value: "basica_5", label: "6to Año EGB" },
  { value: "basica_6", label: "7mo Año EGB" },
  { value: "basica_7", label: "8vo Año EGB" },
];

const PASOS = [
  "Datos del Estudiante",
  "Información Académica",
  "Representante Legal",
  "Familia y Emergencia",
  "Confirmación",
];

const estadoInicial = {
  // Paso 1 - Estudiante
  nombres: "",
  apellidos: "",
  cedula: "",
  fechaNacimiento: "",
  genero: "",
  lugarNacimiento: "",
  nacionalidad: "Ecuatoriana",
  etnia: "mestizo",
  direccion: "",
  barrio: "",
  tieneDiscapacidad: false,
  tipoDiscapacidad: "",
  porcentajeDiscapacidad: 0,
  condicionMedica: "",
  // Paso 2 - Académico
  nivelSolicitado: "",
  anoLectivo: "",
  institucionAnterior: "",
  motivoCambio: "",
  // Paso 3 - Representante
  parentescoRepresentante: "madre",
  nombresRepresentante: "",
  apellidosRepresentante: "",
  cedulaRepresentante: "",
  ocupacionRepresentante: "",
  telefonoRepresentante: "",
  celularRepresentante: "",
  emailRepresentante: "",
  // Paso 4 - Familia y emergencia
  nombresPadre: "",
  apellidosPadre: "",
  cedulaPadre: "",
  ocupacionPadre: "",
  telefonoPadre: "",
  nombresMadre: "",
  apellidosMadre: "",
  cedulaMadre: "",
  ocupacionMadre: "",
  telefonoMadre: "",
  nombreEmergencia: "",
  parentescoEmergencia: "",
  telefonoEmergencia: "",
};

function SolicitudIngresoPage() {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(0);
  const [form, setForm] = useState(estadoInicial);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [codigoGenerado, setCodigoGenerado] = useState("");

  React.useEffect(() => {
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  // ── Helpers de validación ─────────────────────────────────────────────────
  const esEmailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const esCedulaValida = (c) => {
    const v = c.trim();
    if (!/^\d{10}$/.test(v)) return false;
    const provincia = parseInt(v.substring(0, 2), 10);
    return provincia >= 1 && provincia <= 24;
  };
  const esCelularValido = (c) => /^09\d{8}$/.test(c.trim());
  const esTelefonoValido = (t) => /^\d{7,10}$/.test(t.trim());
  const esAnoLectivoValido = (a) => /^\d{4}-\d{4}$/.test(a.trim());

  const edadRazonable = (fechaStr) => {
    if (!fechaStr) return false;
    const hoy = new Date();
    const nacimiento = new Date(fechaStr);
    if (nacimiento >= hoy) return false;
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    return edad >= 3 && edad <= 10;
  };

  const validarPaso = () => {
    if (paso === 0) {
      if (!form.nombres.trim()) return "El nombre del estudiante es requerido.";
      if (!form.apellidos.trim()) return "Los apellidos son requeridos.";
      if (!form.fechaNacimiento) return "La fecha de nacimiento es requerida.";
      if (!edadRazonable(form.fechaNacimiento))
        return "Ingresa una fecha de nacimiento válida (la edad debe estar entre 3 y 10 años).";
      if (!form.genero) return "El género es requerido.";
      if (form.cedula && !esCedulaValida(form.cedula))
        return "La cédula del estudiante debe tener 10 dígitos y los 2 primeros deben ser un código provincial válido (01–24).";
      if (form.tieneDiscapacidad && !form.tipoDiscapacidad.trim())
        return "Indica el tipo de discapacidad del estudiante.";
    }
    if (paso === 1) {
      if (!form.nivelSolicitado) return "Selecciona el nivel solicitado.";
      if (!form.anoLectivo.trim()) return "El año lectivo es requerido.";
      if (!esAnoLectivoValido(form.anoLectivo))
        return "El año lectivo debe tener el formato correcto (ej: 2025-2026).";
    }
    if (paso === 2) {
      if (!form.nombresRepresentante.trim())
        return "El nombre del representante es requerido.";
      if (!form.apellidosRepresentante.trim())
        return "Los apellidos del representante son requeridos.";
      if (!form.cedulaRepresentante.trim())
        return "La cédula del representante es requerida.";
      if (!esCedulaValida(form.cedulaRepresentante))
        return "La cédula del representante debe tener 10 dígitos y los 2 primeros deben ser un código provincial válido (01–24).";
      if (!form.celularRepresentante.trim())
        return "El celular del representante es requerido.";
      if (!esCelularValido(form.celularRepresentante))
        return "El celular debe iniciar en 09 y tener 10 dígitos (ej: 0987654321).";
      if (form.telefonoRepresentante && !esTelefonoValido(form.telefonoRepresentante))
        return "El teléfono convencional debe tener entre 7 y 10 dígitos numéricos.";
      if (!form.emailRepresentante.trim())
        return "El correo electrónico del representante es requerido.";
      if (!esEmailValido(form.emailRepresentante))
        return "Ingresa un correo electrónico válido (ej: nombre@dominio.com).";
    }
    if (paso === 3) {
      if (!form.nombreEmergencia.trim())
        return "El nombre del contacto de emergencia es requerido.";
      if (!form.parentescoEmergencia.trim())
        return "El parentesco del contacto de emergencia es requerido.";
      if (!form.telefonoEmergencia.trim())
        return "El teléfono de emergencia es requerido.";
      if (!esTelefonoValido(form.telefonoEmergencia))
        return "El teléfono de emergencia debe tener entre 7 y 10 dígitos numéricos.";
    }
    return "";
  };

  const siguiente = () => {
    const err = validarPaso();
    if (err) { setError(err); return; }
    setError("");
    setPaso((p) => p + 1);
    window.scrollTo(0, 0);
  };

  const anterior = () => {
    setError("");
    setPaso((p) => p - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    // Re-validar el último paso antes de enviar
    const err = validarPaso();
    if (err) { setError(err); return; }
    setEnviando(true);
    setError("");
    try {
      const res = await axios.post(`${API}/solicitud-ingreso`, form);
      setCodigoGenerado(res.data.codigo);
      setPaso(5);
      window.scrollTo(0, 0);
    } catch (e) {
      setError(
        e.response?.data?.error ||
          "Error al enviar la solicitud. Intenta de nuevo."
      );
    } finally {
      setEnviando(false);
    }
  };

  const progreso = Math.round((paso / PASOS.length) * 100);

  return (
    <>
      <ExamplesNavbar />
      <div
        style={{
          background: "linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)",
          minHeight: "100vh",
          paddingTop: "120px",
          paddingBottom: "60px",
        }}
      >
        <Container>
          {/* Encabezado */}
          <Row className="justify-content-center mb-4">
            <Col md="10" lg="8">
              <div className="text-center mb-4">
                <h2
                  style={{
                    color: "#17174A",
                    fontWeight: "800",
                    fontSize: "2rem",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Solicitud de Ingreso
                </h2>
                <p style={{ color: "#555", fontSize: "1rem" }}>
                  Escuela de Educación Básica Fiscomisional Aliñambi
                </p>
              </div>

              {/* Barra de progreso */}
              {paso < 5 && (
                <>
                  <div className="d-flex justify-content-between mb-1">
                    {PASOS.map((nombre, i) => (
                      <small
                        key={i}
                        style={{
                          color: i <= paso ? "#9CC066" : "#aaa",
                          fontWeight: i === paso ? "700" : "400",
                          fontSize: "0.7rem",
                          textAlign: "center",
                          flex: 1,
                        }}
                      >
                        {nombre}
                      </small>
                    ))}
                  </div>
                  <Progress
                    value={progreso}
                    color="success"
                    className="mb-4"
                    style={{ height: "8px", borderRadius: "4px" }}
                  />
                </>
              )}

              {/* Pantalla de éxito */}
              {paso === 5 && (
                <Card
                  className="shadow-lg"
                  style={{ borderRadius: "16px", border: "none" }}
                >
                  <CardBody className="text-center py-5">
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        backgroundColor: "#e8f5e9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 24px",
                      }}
                    >
                      <i
                        className="nc-icon nc-check-2"
                        style={{ fontSize: "2.5rem", color: "#4caf50" }}
                      />
                    </div>
                    <h3
                      style={{
                        color: "#17174A",
                        fontWeight: "800",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      ¡Solicitud Enviada!
                    </h3>
                    <p style={{ color: "#555", fontSize: "1.1rem" }}>
                      Tu solicitud ha sido registrada exitosamente.
                    </p>
                    <div
                      style={{
                        backgroundColor: "#f1f8e9",
                        borderRadius: "12px",
                        padding: "20px",
                        margin: "20px 0",
                        border: "2px dashed #9CC066",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: "4px",
                          color: "#555",
                          fontSize: "0.9rem",
                        }}
                      >
                        Código de seguimiento
                      </p>
                      <h4
                        style={{
                          color: "#9CC066",
                          fontWeight: "900",
                          letterSpacing: "2px",
                          fontSize: "1.8rem",
                        }}
                      >
                        {codigoGenerado}
                      </h4>
                    </div>
                    <p style={{ color: "#777", fontSize: "0.9rem" }}>
                      Guarda este código para consultar el estado de tu
                      solicitud. La institución se pondrá en contacto contigo.
                    </p>
                    <Button
                      color="success"
                      className="btn-round mt-3"
                      onClick={() => navigate("/matricula-page")}
                    >
                      Volver a Matrículas
                    </Button>
                  </CardBody>
                </Card>
              )}

              {/* Formulario multi-paso */}
              {paso < 5 && (
                <Card
                  className="shadow-lg"
                  style={{ borderRadius: "16px", border: "none" }}
                >
                  <CardBody style={{ padding: "32px" }}>
                    {error && (
                      <Alert color="danger" className="mb-4">
                        <i className="nc-icon nc-alert-circle-i mr-2" />
                        {error}
                      </Alert>
                    )}

                    {/* ── PASO 0: Datos del estudiante ── */}
                    {paso === 0 && (
                      <>
                        <h5
                          className="mb-4"
                          style={{ color: "#17174A", fontWeight: "700" }}
                        >
                          <i className="nc-icon nc-single-02 mr-2" />
                          Datos del Estudiante
                        </h5>
                        <Form>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>
                                  Nombres <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="text"
                                  name="nombres"
                                  value={form.nombres}
                                  onChange={handleChange}
                                  placeholder="Nombres completos"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>
                                  Apellidos{" "}
                                  <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="text"
                                  name="apellidos"
                                  value={form.apellidos}
                                  onChange={handleChange}
                                  placeholder="Apellidos completos"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>Cédula / Pasaporte</Label>
                                <Input
                                  type="text"
                                  name="cedula"
                                  value={form.cedula}
                                  onChange={handleChange}
                                  placeholder="Número de cédula o pasaporte"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>
                                  Fecha de Nacimiento{" "}
                                  <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="date"
                                  name="fechaNacimiento"
                                  value={form.fechaNacimiento}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>
                                  Género <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="select"
                                  name="genero"
                                  value={form.genero}
                                  onChange={handleChange}
                                >
                                  <option value="">Seleccionar...</option>
                                  <option value="masculino">Masculino</option>
                                  <option value="femenino">Femenino</option>
                                  <option value="otro">Otro</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Lugar de Nacimiento</Label>
                                <Input
                                  type="text"
                                  name="lugarNacimiento"
                                  value={form.lugarNacimiento}
                                  onChange={handleChange}
                                  placeholder="Ciudad, provincia"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>Nacionalidad</Label>
                                <Input
                                  type="text"
                                  name="nacionalidad"
                                  value={form.nacionalidad}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Etnia</Label>
                                <Input
                                  type="select"
                                  name="etnia"
                                  value={form.etnia}
                                  onChange={handleChange}
                                >
                                  <option value="mestizo">Mestizo/a</option>
                                  <option value="indigena">Indígena</option>
                                  <option value="afroecuatoriano">
                                    Afroecuatoriano/a
                                  </option>
                                  <option value="montubio">Montubio/a</option>
                                  <option value="blanco">Blanco/a</option>
                                  <option value="otro">Otro</option>
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="8">
                              <FormGroup>
                                <Label>Dirección Domiciliaria</Label>
                                <Input
                                  type="text"
                                  name="direccion"
                                  value={form.direccion}
                                  onChange={handleChange}
                                  placeholder="Calle principal y número"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Barrio / Sector</Label>
                                <Input
                                  type="text"
                                  name="barrio"
                                  value={form.barrio}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <FormGroup check className="mb-3">
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    name="tieneDiscapacidad"
                                    checked={form.tieneDiscapacidad}
                                    onChange={handleChange}
                                  />{" "}
                                  El estudiante tiene alguna discapacidad
                                </Label>
                              </FormGroup>
                            </Col>
                          </Row>
                          {form.tieneDiscapacidad && (
                            <Row>
                              <Col md="8">
                                <FormGroup>
                                  <Label>Tipo de Discapacidad</Label>
                                  <Input
                                    type="text"
                                    name="tipoDiscapacidad"
                                    value={form.tipoDiscapacidad}
                                    onChange={handleChange}
                                    placeholder="Ej: Visual, Auditiva, Motriz..."
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="4">
                                <FormGroup>
                                  <Label>Porcentaje (%)</Label>
                                  <Input
                                    type="number"
                                    name="porcentajeDiscapacidad"
                                    value={form.porcentajeDiscapacidad}
                                    onChange={handleChange}
                                    min="0"
                                    max="100"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          )}
                          <FormGroup>
                            <Label>
                              Condición Médica Relevante{" "}
                              <small className="text-muted">
                                (alergias, medicamentos, etc.)
                              </small>
                            </Label>
                            <Input
                              type="textarea"
                              name="condicionMedica"
                              value={form.condicionMedica}
                              onChange={handleChange}
                              rows="2"
                              placeholder="Describe cualquier condición médica importante..."
                            />
                          </FormGroup>
                        </Form>
                      </>
                    )}

                    {/* ── PASO 1: Información académica ── */}
                    {paso === 1 && (
                      <>
                        <h5
                          className="mb-4"
                          style={{ color: "#17174A", fontWeight: "700" }}
                        >
                          <i className="nc-icon nc-hat-3 mr-2" />
                          Información Académica
                        </h5>
                        <Form>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>
                                  Nivel Solicitado{" "}
                                  <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="select"
                                  name="nivelSolicitado"
                                  value={form.nivelSolicitado}
                                  onChange={handleChange}
                                >
                                  <option value="">Seleccionar nivel...</option>
                                  {NIVELES.map((n) => (
                                    <option key={n.value} value={n.value}>
                                      {n.label}
                                    </option>
                                  ))}
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>
                                  Año Lectivo{" "}
                                  <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="text"
                                  name="anoLectivo"
                                  value={form.anoLectivo}
                                  onChange={handleChange}
                                  placeholder="Ej: 2024-2025"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <FormGroup>
                            <Label>
                              Institución Educativa Anterior{" "}
                              <small className="text-muted">
                                (si aplica)
                              </small>
                            </Label>
                            <Input
                              type="text"
                              name="institucionAnterior"
                              value={form.institucionAnterior}
                              onChange={handleChange}
                              placeholder="Nombre de la institución anterior"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>
                              Motivo de Cambio de Institución{" "}
                              <small className="text-muted">
                                (si aplica)
                              </small>
                            </Label>
                            <Input
                              type="textarea"
                              name="motivoCambio"
                              value={form.motivoCambio}
                              onChange={handleChange}
                              rows="3"
                              placeholder="Indica el motivo por el que deseas cambiarte de institución..."
                            />
                          </FormGroup>

                          {/* Información de documentos requeridos */}
                          <div
                            style={{
                              backgroundColor: "#e3f2fd",
                              borderRadius: "12px",
                              padding: "20px",
                              marginTop: "16px",
                            }}
                          >
                            <h6
                              style={{
                                color: "#1565c0",
                                fontWeight: "700",
                                marginBottom: "12px",
                              }}
                            >
                              <i className="nc-icon nc-alert-circle-i mr-2" />
                              Documentos a presentar en secretaría
                            </h6>
                            <ul
                              style={{
                                color: "#333",
                                marginBottom: 0,
                                paddingLeft: "20px",
                              }}
                            >
                              <li>Copia de cédula del estudiante (o partida de nacimiento)</li>
                              <li>Copia de cédula del representante legal</li>
                              <li>2 fotos tamaño carnet recientes</li>
                              <li>Carnet de vacunas actualizado</li>
                              <li>Certificado de estudios del año anterior (si aplica)</li>
                              <li>Certificado médico (si tiene condición especial)</li>
                            </ul>
                          </div>
                        </Form>
                      </>
                    )}

                    {/* ── PASO 2: Representante legal ── */}
                    {paso === 2 && (
                      <>
                        <h5
                          className="mb-4"
                          style={{ color: "#17174A", fontWeight: "700" }}
                        >
                          <i className="nc-icon nc-badge mr-2" />
                          Representante Legal
                        </h5>
                        <Form>
                          <FormGroup>
                            <Label>
                              Parentesco <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="select"
                              name="parentescoRepresentante"
                              value={form.parentescoRepresentante}
                              onChange={handleChange}
                            >
                              <option value="padre">Padre</option>
                              <option value="madre">Madre</option>
                              <option value="tutor_legal">Tutor/a Legal</option>
                              <option value="otro">Otro</option>
                            </Input>
                          </FormGroup>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>
                                  Nombres <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="text"
                                  name="nombresRepresentante"
                                  value={form.nombresRepresentante}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>
                                  Apellidos{" "}
                                  <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="text"
                                  name="apellidosRepresentante"
                                  value={form.apellidosRepresentante}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>
                                  Cédula / Pasaporte{" "}
                                  <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="text"
                                  name="cedulaRepresentante"
                                  value={form.cedulaRepresentante}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Ocupación</Label>
                                <Input
                                  type="text"
                                  name="ocupacionRepresentante"
                                  value={form.ocupacionRepresentante}
                                  onChange={handleChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>Teléfono Convencional</Label>
                                <Input
                                  type="tel"
                                  name="telefonoRepresentante"
                                  value={form.telefonoRepresentante}
                                  onChange={handleChange}
                                  placeholder="02XXXXXXX"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>
                                  Celular{" "}
                                  <span className="text-danger">*</span>
                                </Label>
                                <Input
                                  type="tel"
                                  name="celularRepresentante"
                                  value={form.celularRepresentante}
                                  onChange={handleChange}
                                  placeholder="09XXXXXXXX"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <FormGroup>
                            <Label>
                              Correo Electrónico{" "}
                              <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="email"
                              name="emailRepresentante"
                              value={form.emailRepresentante}
                              onChange={handleChange}
                              placeholder="correo@ejemplo.com"
                            />
                          </FormGroup>
                        </Form>
                      </>
                    )}

                    {/* ── PASO 3: Familia y emergencia ── */}
                    {paso === 3 && (
                      <>
                        <h5
                          className="mb-4"
                          style={{ color: "#17174A", fontWeight: "700" }}
                        >
                          <i className="nc-icon nc-circle-09 mr-2" />
                          Datos de los Padres y Contacto de Emergencia
                        </h5>
                        <Form>
                          {/* Datos del padre */}
                          <div
                            style={{
                              backgroundColor: "#f9fbe7",
                              borderRadius: "12px",
                              padding: "20px",
                              marginBottom: "20px",
                            }}
                          >
                            <h6
                              style={{
                                color: "#558b2f",
                                fontWeight: "700",
                                marginBottom: "16px",
                              }}
                            >
                              Datos del Padre{" "}
                              <small className="text-muted font-weight-normal">
                                (opcional)
                              </small>
                            </h6>
                            <Row>
                              <Col md="6">
                                <FormGroup>
                                  <Label>Nombres</Label>
                                  <Input
                                    type="text"
                                    name="nombresPadre"
                                    value={form.nombresPadre}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="6">
                                <FormGroup>
                                  <Label>Apellidos</Label>
                                  <Input
                                    type="text"
                                    name="apellidosPadre"
                                    value={form.apellidosPadre}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="4">
                                <FormGroup>
                                  <Label>Cédula</Label>
                                  <Input
                                    type="text"
                                    name="cedulaPadre"
                                    value={form.cedulaPadre}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="4">
                                <FormGroup>
                                  <Label>Ocupación</Label>
                                  <Input
                                    type="text"
                                    name="ocupacionPadre"
                                    value={form.ocupacionPadre}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="4">
                                <FormGroup>
                                  <Label>Teléfono / Celular</Label>
                                  <Input
                                    type="tel"
                                    name="telefonoPadre"
                                    value={form.telefonoPadre}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>

                          {/* Datos de la madre */}
                          <div
                            style={{
                              backgroundColor: "#fce4ec",
                              borderRadius: "12px",
                              padding: "20px",
                              marginBottom: "20px",
                            }}
                          >
                            <h6
                              style={{
                                color: "#880e4f",
                                fontWeight: "700",
                                marginBottom: "16px",
                              }}
                            >
                              Datos de la Madre{" "}
                              <small className="text-muted font-weight-normal">
                                (opcional)
                              </small>
                            </h6>
                            <Row>
                              <Col md="6">
                                <FormGroup>
                                  <Label>Nombres</Label>
                                  <Input
                                    type="text"
                                    name="nombresMadre"
                                    value={form.nombresMadre}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="6">
                                <FormGroup>
                                  <Label>Apellidos</Label>
                                  <Input
                                    type="text"
                                    name="apellidosMadre"
                                    value={form.apellidosMadre}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="4">
                                <FormGroup>
                                  <Label>Cédula</Label>
                                  <Input
                                    type="text"
                                    name="cedulaMadre"
                                    value={form.cedulaMadre}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="4">
                                <FormGroup>
                                  <Label>Ocupación</Label>
                                  <Input
                                    type="text"
                                    name="ocupacionMadre"
                                    value={form.ocupacionMadre}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="4">
                                <FormGroup>
                                  <Label>Teléfono / Celular</Label>
                                  <Input
                                    type="tel"
                                    name="telefonoMadre"
                                    value={form.telefonoMadre}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>

                          {/* Contacto de emergencia */}
                          <div
                            style={{
                              backgroundColor: "#fff3e0",
                              borderRadius: "12px",
                              padding: "20px",
                            }}
                          >
                            <h6
                              style={{
                                color: "#e65100",
                                fontWeight: "700",
                                marginBottom: "16px",
                              }}
                            >
                              Contacto de Emergencia{" "}
                              <span className="text-danger">*</span>
                            </h6>
                            <Row>
                              <Col md="5">
                                <FormGroup>
                                  <Label>
                                    Nombre Completo{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    name="nombreEmergencia"
                                    value={form.nombreEmergencia}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="4">
                                <FormGroup>
                                  <Label>
                                    Parentesco{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    type="text"
                                    name="parentescoEmergencia"
                                    value={form.parentescoEmergencia}
                                    onChange={handleChange}
                                    placeholder="Ej: Tío, abuela..."
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="3">
                                <FormGroup>
                                  <Label>
                                    Teléfono{" "}
                                    <span className="text-danger">*</span>
                                  </Label>
                                  <Input
                                    type="tel"
                                    name="telefonoEmergencia"
                                    value={form.telefonoEmergencia}
                                    onChange={handleChange}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        </Form>
                      </>
                    )}

                    {/* ── PASO 4: Confirmación ── */}
                    {paso === 4 && (
                      <>
                        <h5
                          className="mb-4"
                          style={{ color: "#17174A", fontWeight: "700" }}
                        >
                          <i className="nc-icon nc-paper mr-2" />
                          Resumen de la Solicitud
                        </h5>
                        <ResumenSolicitud form={form} />
                        <div
                          style={{
                            backgroundColor: "#e8f5e9",
                            borderRadius: "12px",
                            padding: "16px",
                            marginTop: "20px",
                          }}
                        >
                          <p
                            style={{
                              color: "#2e7d32",
                              margin: 0,
                              fontSize: "0.9rem",
                            }}
                          >
                            <i className="nc-icon nc-check-2 mr-2" />
                            Al enviar esta solicitud, declaro que los datos
                            proporcionados son verídicos. La institución
                            revisará esta solicitud y se comunicará con el
                            representante registrado.
                          </p>
                        </div>
                      </>
                    )}

                    {/* Botones de navegación */}
                    <div
                      className="d-flex justify-content-between mt-4"
                      style={{ gap: "12px" }}
                    >
                      {paso > 0 && (
                        <Button
                          color="secondary"
                          outline
                          className="btn-round"
                          onClick={anterior}
                          disabled={enviando}
                        >
                          <i className="nc-icon nc-minimal-left mr-1" />
                          Anterior
                        </Button>
                      )}
                      <div className="ml-auto">
                        {paso < 4 && (
                          <Button
                            color="success"
                            className="btn-round"
                            onClick={siguiente}
                            style={{ minWidth: "140px" }}
                          >
                            Siguiente
                            <i className="nc-icon nc-minimal-right ml-1" />
                          </Button>
                        )}
                        {paso === 4 && (
                          <Button
                            color="success"
                            className="btn-round"
                            onClick={handleSubmit}
                            disabled={enviando}
                            style={{ minWidth: "180px" }}
                          >
                            {enviando ? (
                              <>Enviando...</>
                            ) : (
                              <>
                                <i className="nc-icon nc-send mr-1" />
                                Enviar Solicitud
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

// Componente de resumen
function ResumenSolicitud({ form }) {
  const nivelLabel =
    {
      inicial_1: "Inicial 1 (2-3 años)",
      inicial_2: "Inicial 2 (3-4 años)",
      preparatoria: "Preparatoria (1ro EGB)",
      basica_1: "2do EGB",
      basica_2: "3ro EGB",
      basica_3: "4to EGB",
      basica_4: "5to EGB",
      basica_5: "6to EGB",
      basica_6: "7mo EGB",
      basica_7: "8vo EGB",
    }[form.nivelSolicitado] || form.nivelSolicitado;

  const filas = [
    ["Estudiante", `${form.nombres} ${form.apellidos}`],
    ["Cédula estudiante", form.cedula || "—"],
    ["Fecha de nacimiento", form.fechaNacimiento],
    ["Género", form.genero],
    ["Nivel solicitado", nivelLabel],
    ["Año lectivo", form.anoLectivo],
    [
      "Representante",
      `${form.nombresRepresentante} ${form.apellidosRepresentante}`,
    ],
    ["Parentesco", form.parentescoRepresentante],
    ["Celular representante", form.celularRepresentante],
    ["Email representante", form.emailRepresentante],
    ["Contacto emergencia", form.nombreEmergencia],
    ["Teléfono emergencia", form.telefonoEmergencia],
  ];

  return (
    <div style={{ fontSize: "0.9rem" }}>
      {filas.map(([label, valor]) => (
        <Row
          key={label}
          style={{
            padding: "8px 0",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Col xs="5" style={{ color: "#777", fontWeight: "600" }}>
            {label}
          </Col>
          <Col xs="7" style={{ color: "#333" }}>
            {valor || <span style={{ color: "#ccc" }}>—</span>}
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default SolicitudIngresoPage;
