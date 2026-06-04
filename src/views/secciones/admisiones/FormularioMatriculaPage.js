import React, { useState } from "react";
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
  "Verificación",
  "Datos del Estudiante",
  "Representante",
  "Documentación",
  "Confirmación",
];

const estadoInicial = {
  // Verificación
  codigoSolicitud: "",
  // Datos del estudiante
  nombres: "",
  apellidos: "",
  cedula: "",
  fechaNacimiento: "",
  genero: "",
  nivelSolicitado: "",
  anoLectivo: "",
  // Representante
  nombresRepresentante: "",
  apellidosRepresentante: "",
  cedulaRepresentante: "",
  celularRepresentante: "",
  emailRepresentante: "",
  direccion: "",
  // Documentación (checkboxes)
  docCedulaEstudiante: false,
  docCedulaRepresentante: false,
  docFotos: false,
  docVacunas: false,
  docCertificadoEstudios: false,
  docComprobantePago: false,
  // Aceptación
  aceptaTerminos: false,
  nombreFirmante: "",
};

function FormularioMatriculaPage() {
  const [paso, setPaso] = useState(0);
  const [form, setForm] = useState(estadoInicial);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [verificando, setVerificando] = useState(false);
  const [solicitudVerificada, setSolicitudVerificada] = useState(null);

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
  const esCedulaValida = (c) => /^\d{10}$/.test(c.trim());
  const esCelularValido = (c) => /^09\d{8}$/.test(c.trim());
  const esAnoLectivoValido = (a) => /^\d{4}-\d{4}$/.test(a.trim());
  const edadRazonable = (fechaStr) => {
    if (!fechaStr) return false;
    const hoy = new Date();
    const nac = new Date(fechaStr);
    if (nac >= hoy) return false;
    const edad = hoy.getFullYear() - nac.getFullYear();
    return edad >= 2 && edad <= 20;
  };

  // Verificar código — usa endpoint dedicado, no descarga todos los registros
  const verificarCodigo = async () => {
    const codigo = form.codigoSolicitud.trim().toUpperCase();
    if (!codigo) {
      setError("Ingresa tu código de solicitud.");
      return;
    }
    if (!/^SOL-\d{4}-\d{4}$/.test(codigo))
      return setError("El formato del código no es válido (ej: SOL-2025-0001).");
    setVerificando(true);
    setError("");
    try {
      const res = await axios.get(`${API}/solicitud-ingreso/verificar/${codigo}`);
      const encontrada = res.data;
      setSolicitudVerificada(encontrada);
      setForm((prev) => ({
        ...prev,
        codigoSolicitud: codigo,
        nombres: encontrada.nombres || "",
        apellidos: encontrada.apellidos || "",
        cedula: encontrada.cedula || "",
        fechaNacimiento: encontrada.fechaNacimiento
          ? encontrada.fechaNacimiento.slice(0, 10)
          : "",
        genero: encontrada.genero || "",
        nivelSolicitado: encontrada.nivelSolicitado || "",
        anoLectivo: encontrada.anoLectivo || "",
        nombresRepresentante: encontrada.nombresRepresentante || "",
        apellidosRepresentante: encontrada.apellidosRepresentante || "",
        cedulaRepresentante: encontrada.cedulaRepresentante || "",
        celularRepresentante: encontrada.celularRepresentante || "",
        emailRepresentante: encontrada.emailRepresentante || "",
      }));
      setPaso(1);
      window.scrollTo(0, 0);
    } catch (e) {
      setError(
        e.response?.status === 404
          ? "Código no encontrado o la solicitud no está en estado Aprobado. Verifica el código recibido en tu correo."
          : "Error al verificar el código. Intenta de nuevo."
      );
    } finally {
      setVerificando(false);
    }
  };

  const validarPaso = () => {
    if (paso === 1) {
      if (!form.nombres.trim()) return "El nombre del estudiante es requerido.";
      if (!form.apellidos.trim()) return "Los apellidos son requeridos.";
      if (!form.cedula.trim()) return "La cédula del estudiante es requerida.";
      if (!esCedulaValida(form.cedula))
        return "La cédula del estudiante debe tener exactamente 10 dígitos numéricos.";
      if (!form.fechaNacimiento) return "La fecha de nacimiento es requerida.";
      if (!edadRazonable(form.fechaNacimiento))
        return "Ingresa una fecha de nacimiento válida (edad entre 2 y 20 años).";
      if (!form.genero) return "El género es requerido.";
      if (!form.nivelSolicitado) return "El nivel es requerido.";
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
        return "La cédula del representante debe tener exactamente 10 dígitos numéricos.";
      if (!form.celularRepresentante.trim())
        return "El celular del representante es requerido.";
      if (!esCelularValido(form.celularRepresentante))
        return "El celular debe iniciar en 09 y tener 10 dígitos (ej: 0987654321).";
      if (!form.emailRepresentante.trim())
        return "El correo electrónico del representante es requerido.";
      if (!esEmailValido(form.emailRepresentante))
        return "Ingresa un correo electrónico válido (ej: nombre@dominio.com).";
      if (!form.direccion.trim())
        return "La dirección domiciliaria es requerida.";
    }
    if (paso === 3) {
      const docsObligatorios = [
        "docCedulaEstudiante",
        "docCedulaRepresentante",
        "docFotos",
        "docVacunas",
        "docComprobantePago",
      ];
      if (docsObligatorios.some((d) => !form[d]))
        return "Debes confirmar que tienes todos los documentos obligatorios marcados con *.";
    }
    if (paso === 4) {
      if (!form.aceptaTerminos)
        return "Debes aceptar los términos y condiciones.";
      if (!form.nombreFirmante.trim())
        return "Escribe tu nombre completo como firma de confirmación.";
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
    const err = validarPaso();
    if (err) { setError(err); return; }
    setEnviando(true);
    setError("");
    try {
      // Se envía el formulario de matrícula como una nueva solicitud con tipo "matricula"
      await axios.post(`${API}/solicitud-ingreso`, {
        ...form,
        estado: "en_revision",
        nivelSolicitado: form.nivelSolicitado,
        parentescoRepresentante: solicitudVerificada?.parentescoRepresentante || "otro",
        nombreEmergencia: solicitudVerificada?.nombreEmergencia || "Por confirmar",
        parentescoEmergencia: solicitudVerificada?.parentescoEmergencia || "Familiar",
        telefonoEmergencia: solicitudVerificada?.telefonoEmergencia || form.celularRepresentante,
        esFormularioMatricula: true,
        referenciaCodigoSolicitud: form.codigoSolicitud,
      });
      setPaso(5);
      window.scrollTo(0, 0);
    } catch (e) {
      setError(
        e.response?.data?.error ||
          "Error al enviar el formulario. Intenta de nuevo."
      );
    } finally {
      setEnviando(false);
    }
  };

  const progreso =
    paso === 0 ? 0 : Math.round(((paso) / PASOS.length) * 100);

  const nivelLabel =
    NIVELES.find((n) => n.value === form.nivelSolicitado)?.label ||
    form.nivelSolicitado;

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
          <Row className="justify-content-center">
            <Col md="10" lg="8">
              {/* Encabezado */}
              <div className="text-center mb-4">
                <h2
                  style={{
                    color: "#17174A",
                    fontWeight: "800",
                    fontSize: "2rem",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  Formulario de Matrícula Formal
                </h2>
                <p style={{ color: "#555" }}>
                  Escuela de Educación Básica Fiscomisional Aliñambi
                </p>
                {/* Aviso de requisito */}
                <div
                  style={{
                    background: "#fff3cd",
                    border: "1px solid #f0ad4e",
                    borderRadius: "10px",
                    padding: "12px 20px",
                    display: "inline-block",
                    fontSize: "0.85rem",
                    color: "#856404",
                    marginTop: "8px",
                  }}
                >
                  ⚠️ Este formulario es exclusivo para solicitudes con estado{" "}
                  <strong>Aprobado</strong>. Necesitas tu código de solicitud.
                </div>
              </div>

              {/* Barra de progreso */}
              {paso > 0 && paso < 5 && (
                <>
                  <div className="d-flex justify-content-between mb-1">
                    {PASOS.map((nombre, i) => (
                      <small
                        key={i}
                        style={{
                          color: i < paso ? "#9CC066" : i === paso ? "#17174A" : "#aaa",
                          fontWeight: i === paso ? "700" : "400",
                          fontSize: "0.68rem",
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

              {/* ── Pantalla de éxito ── */}
              {paso === 5 && (
                <Card className="shadow-lg" style={{ borderRadius: "16px", border: "none" }}>
                  <CardBody className="text-center py-5">
                    <div
                      style={{
                        width: "80px", height: "80px", borderRadius: "50%",
                        backgroundColor: "#e8f5e9",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 24px",
                      }}
                    >
                      <i className="nc-icon nc-check-2" style={{ fontSize: "2.5rem", color: "#4caf50" }} />
                    </div>
                    <h3 style={{ color: "#17174A", fontWeight: "800" }}>
                      ¡Matrícula Registrada!
                    </h3>
                    <p style={{ color: "#555" }}>
                      El formulario de matrícula formal de{" "}
                      <strong>
                        {form.nombres} {form.apellidos}
                      </strong>{" "}
                      ha sido enviado correctamente.
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
                      <p style={{ marginBottom: "4px", color: "#555", fontSize: "0.9rem" }}>
                        Referencia de solicitud original
                      </p>
                      <h4 style={{ color: "#9CC066", fontWeight: "900", letterSpacing: "2px" }}>
                        {form.codigoSolicitud}
                      </h4>
                    </div>
                    <div
                      style={{
                        background: "#e3f2fd",
                        borderRadius: "10px",
                        padding: "16px",
                        marginBottom: "20px",
                        textAlign: "left",
                      }}
                    >
                      <p style={{ margin: 0, color: "#1565c0", fontSize: "0.9rem" }}>
                        <strong>Próximos pasos:</strong>
                        <br />• Acércate a la secretaría con los documentos originales.
                        <br />• Presenta este código de referencia:{" "}
                        <strong>{form.codigoSolicitud}</strong>
                        <br />• Horario de atención: lunes a viernes 07:30–13:00.
                      </p>
                    </div>
                    <Button
                      color="success"
                      className="btn-round"
                      href="/matricula-page"
                    >
                      Volver a Matrículas
                    </Button>
                  </CardBody>
                </Card>
              )}

              {/* ── PASO 0: Verificación del código ── */}
              {paso === 0 && (
                <Card className="shadow-lg" style={{ borderRadius: "16px", border: "none" }}>
                  <CardBody style={{ padding: "40px" }}>
                    <div className="text-center mb-4">
                      <i
                        className="nc-icon nc-key-25"
                        style={{ fontSize: "3rem", color: "#9CC066" }}
                      />
                      <h5 style={{ color: "#17174A", fontWeight: "700", marginTop: "12px" }}>
                        Verificación de Solicitud
                      </h5>
                      <p style={{ color: "#777", fontSize: "0.9rem" }}>
                        Ingresa el código que recibiste en el correo de aprobación
                        para continuar con la matrícula.
                      </p>
                    </div>
                    {error && <Alert color="danger">{error}</Alert>}
                    <Form>
                      <FormGroup>
                        <Label>
                          Código de Solicitud Aprobada{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="codigoSolicitud"
                          value={form.codigoSolicitud}
                          onChange={handleChange}
                          placeholder="Ej: SOL-2025-0001"
                          style={{
                            fontSize: "1.2rem",
                            textAlign: "center",
                            letterSpacing: "2px",
                            fontWeight: "700",
                          }}
                          onKeyDown={(e) => e.key === "Enter" && verificarCodigo()}
                        />
                        <small className="text-muted">
                          El código está en el correo electrónico de aprobación que recibiste.
                        </small>
                      </FormGroup>
                      <Button
                        color="success"
                        className="btn-round d-block w-100"
                        onClick={verificarCodigo}
                        disabled={verificando}
                        style={{ marginTop: "16px" }}
                      >
                        {verificando ? "Verificando..." : "Verificar y Continuar"}
                      </Button>
                    </Form>
                    <hr />
                    <p className="text-center" style={{ color: "#888", fontSize: "0.85rem" }}>
                      ¿Aún no tienes tu solicitud aprobada?{" "}
                      <a href="/solicitud-ingreso" style={{ color: "#9CC066" }}>
                        Envía tu solicitud de ingreso aquí
                      </a>
                    </p>
                  </CardBody>
                </Card>
              )}

              {/* ── Formulario multi-paso (pasos 1-4) ── */}
              {paso >= 1 && paso <= 4 && (
                <Card className="shadow-lg" style={{ borderRadius: "16px", border: "none" }}>
                  <CardBody style={{ padding: "36px" }}>
                    {error && (
                      <Alert color="danger" className="mb-4">
                        <i className="nc-icon nc-alert-circle-i mr-2" />
                        {error}
                      </Alert>
                    )}

                    {/* Banner de solicitud verificada */}
                    {solicitudVerificada && (
                      <div
                        style={{
                          background: "#e8f5e9",
                          border: "1px solid #9CC066",
                          borderRadius: "8px",
                          padding: "10px 16px",
                          marginBottom: "24px",
                          fontSize: "0.85rem",
                          color: "#2e7d32",
                        }}
                      >
                        <i className="nc-icon nc-check-2 mr-2" />
                        Solicitud verificada:{" "}
                        <strong>{solicitudVerificada.codigoSolicitud}</strong> —{" "}
                        {solicitudVerificada.nombres} {solicitudVerificada.apellidos}
                      </div>
                    )}

                    {/* ── PASO 1: Datos del estudiante ── */}
                    {paso === 1 && (
                      <>
                        <h5 style={{ color: "#17174A", fontWeight: "700" }} className="mb-4">
                          <i className="nc-icon nc-single-02 mr-2" />
                          Confirmación de Datos del Estudiante
                        </h5>
                        <p style={{ color: "#777", fontSize: "0.85rem", marginBottom: "20px" }}>
                          Verifica y completa los datos del estudiante. Los campos
                          pre-llenados provienen de tu solicitud original.
                        </p>
                        <Form>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>Nombres <span className="text-danger">*</span></Label>
                                <Input type="text" name="nombres" value={form.nombres} onChange={handleChange} />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Apellidos <span className="text-danger">*</span></Label>
                                <Input type="text" name="apellidos" value={form.apellidos} onChange={handleChange} />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>Cédula / Pasaporte <span className="text-danger">*</span></Label>
                                <Input type="text" name="cedula" value={form.cedula} onChange={handleChange} placeholder="Número de documento" />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Fecha de Nacimiento <span className="text-danger">*</span></Label>
                                <Input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>Género <span className="text-danger">*</span></Label>
                                <Input type="select" name="genero" value={form.genero} onChange={handleChange}>
                                  <option value="">Seleccionar...</option>
                                  <option value="masculino">Masculino</option>
                                  <option value="femenino">Femenino</option>
                                  <option value="otro">Otro</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Nivel a Matricular <span className="text-danger">*</span></Label>
                                <Input type="select" name="nivelSolicitado" value={form.nivelSolicitado} onChange={handleChange}>
                                  <option value="">Seleccionar nivel...</option>
                                  {NIVELES.map((n) => (
                                    <option key={n.value} value={n.value}>{n.label}</option>
                                  ))}
                                </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                          <FormGroup>
                            <Label>Año Lectivo <span className="text-danger">*</span></Label>
                            <Input type="text" name="anoLectivo" value={form.anoLectivo} onChange={handleChange} placeholder="Ej: 2025-2026" />
                          </FormGroup>
                        </Form>
                      </>
                    )}

                    {/* ── PASO 2: Datos del representante ── */}
                    {paso === 2 && (
                      <>
                        <h5 style={{ color: "#17174A", fontWeight: "700" }} className="mb-4">
                          <i className="nc-icon nc-badge mr-2" />
                          Datos del Representante Legal
                        </h5>
                        <Form>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>Nombres <span className="text-danger">*</span></Label>
                                <Input type="text" name="nombresRepresentante" value={form.nombresRepresentante} onChange={handleChange} />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Apellidos <span className="text-danger">*</span></Label>
                                <Input type="text" name="apellidosRepresentante" value={form.apellidosRepresentante} onChange={handleChange} />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup>
                                <Label>Cédula <span className="text-danger">*</span></Label>
                                <Input type="text" name="cedulaRepresentante" value={form.cedulaRepresentante} onChange={handleChange} />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <Label>Celular <span className="text-danger">*</span></Label>
                                <Input type="tel" name="celularRepresentante" value={form.celularRepresentante} onChange={handleChange} placeholder="09XXXXXXXX" />
                              </FormGroup>
                            </Col>
                          </Row>
                          <FormGroup>
                            <Label>Correo Electrónico <span className="text-danger">*</span></Label>
                            <Input type="email" name="emailRepresentante" value={form.emailRepresentante} onChange={handleChange} />
                          </FormGroup>
                          <FormGroup>
                            <Label>Dirección Domiciliaria <span className="text-danger">*</span></Label>
                            <Input type="text" name="direccion" value={form.direccion} onChange={handleChange} placeholder="Calle principal, número, barrio" />
                          </FormGroup>
                        </Form>
                      </>
                    )}

                    {/* ── PASO 3: Documentación ── */}
                    {paso === 3 && (
                      <>
                        <h5 style={{ color: "#17174A", fontWeight: "700" }} className="mb-2">
                          <i className="nc-icon nc-paper mr-2" />
                          Confirmación de Documentos
                        </h5>
                        <p style={{ color: "#777", fontSize: "0.85rem", marginBottom: "20px" }}>
                          Confirma que tienes listos los siguientes documentos para
                          presentar en la secretaría. Los marcados con{" "}
                          <span className="text-danger">*</span> son obligatorios.
                        </p>
                        <Form>
                          {[
                            { name: "docCedulaEstudiante", label: "Copia de cédula o acta de nacimiento del estudiante", req: true },
                            { name: "docCedulaRepresentante", label: "Copia de cédula vigente del representante legal", req: true },
                            { name: "docFotos", label: "2 fotografías tamaño carnet (fondo blanco, recientes)", req: true },
                            { name: "docVacunas", label: "Carnet de vacunación actualizado (MSP)", req: true },
                            { name: "docCertificadoEstudios", label: "Certificado de estudios del año anterior (si aplica)", req: false },
                            { name: "docComprobantePago", label: "Comprobante de pago de matrícula original", req: true },
                          ].map((doc) => (
                            <div
                              key={doc.name}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "12px",
                                padding: "14px 16px",
                                marginBottom: "8px",
                                borderRadius: "10px",
                                backgroundColor: form[doc.name] ? "#e8f5e9" : "#f8f9fa",
                                border: `1px solid ${form[doc.name] ? "#9CC066" : "#dee2e6"}`,
                                transition: "all 0.2s",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                setForm((prev) => ({
                                  ...prev,
                                  [doc.name]: !prev[doc.name],
                                }))
                              }
                            >
                              <Input
                                type="checkbox"
                                name={doc.name}
                                checked={form[doc.name]}
                                onChange={handleChange}
                                style={{ marginTop: "2px", cursor: "pointer", flexShrink: 0 }}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span style={{ fontSize: "0.9rem", color: "#333" }}>
                                {doc.label}
                                {doc.req && (
                                  <span className="text-danger ml-1">*</span>
                                )}
                              </span>
                            </div>
                          ))}
                        </Form>
                      </>
                    )}

                    {/* ── PASO 4: Confirmación y firma ── */}
                    {paso === 4 && (
                      <>
                        <h5 style={{ color: "#17174A", fontWeight: "700" }} className="mb-4">
                          <i className="nc-icon nc-check-2 mr-2" />
                          Confirmación Final
                        </h5>

                        {/* Resumen */}
                        <div
                          style={{
                            background: "#f8f9fa",
                            borderRadius: "12px",
                            padding: "20px",
                            marginBottom: "24px",
                          }}
                        >
                          <h6 style={{ color: "#17174A", fontWeight: "700", marginBottom: "12px" }}>
                            Resumen de Matrícula
                          </h6>
                          {[
                            ["Estudiante", `${form.nombres} ${form.apellidos}`],
                            ["Cédula", form.cedula],
                            ["Nivel", nivelLabel],
                            ["Año lectivo", form.anoLectivo],
                            ["Representante", `${form.nombresRepresentante} ${form.apellidosRepresentante}`],
                            ["Celular", form.celularRepresentante],
                            ["Email", form.emailRepresentante],
                            ["Código solicitud", form.codigoSolicitud],
                          ].map(([label, valor]) => (
                            <Row key={label} style={{ padding: "6px 0", borderBottom: "1px solid #eee" }}>
                              <Col xs="5"><small style={{ color: "#888", fontWeight: "600" }}>{label}</small></Col>
                              <Col xs="7"><small style={{ color: "#333" }}>{valor || "—"}</small></Col>
                            </Row>
                          ))}
                        </div>

                        <Form>
                          <div
                            style={{
                              background: "#e3f2fd",
                              borderRadius: "10px",
                              padding: "16px",
                              marginBottom: "20px",
                              fontSize: "0.85rem",
                              color: "#1565c0",
                            }}
                          >
                            <strong>Declaración de responsabilidad:</strong>
                            <p style={{ margin: "8px 0 0" }}>
                              Al enviar este formulario, el/la representante legal declara que
                              toda la información proporcionada es verídica y que se compromete
                              a presentar los documentos originales en la secretaría de la institución
                              dentro del plazo establecido para completar el proceso de matrícula.
                            </p>
                          </div>

                          <FormGroup>
                            <Label>
                              Nombre completo del representante (firma digital){" "}
                              <span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="text"
                              name="nombreFirmante"
                              value={form.nombreFirmante}
                              onChange={handleChange}
                              placeholder="Escribe tu nombre completo como confirmación"
                            />
                          </FormGroup>

                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                name="aceptaTerminos"
                                checked={form.aceptaTerminos}
                                onChange={handleChange}
                              />{" "}
                              Acepto los términos y condiciones del proceso de matrícula y
                              confirmo que los datos ingresados son correctos.{" "}
                              <span className="text-danger">*</span>
                            </Label>
                          </FormGroup>
                        </Form>
                      </>
                    )}

                    {/* Botones de navegación */}
                    <div className="d-flex justify-content-between mt-4">
                      {paso > 1 && (
                        <Button color="secondary" outline className="btn-round" onClick={anterior} disabled={enviando}>
                          <i className="nc-icon nc-minimal-left mr-1" />
                          Anterior
                        </Button>
                      )}
                      <div className="ml-auto">
                        {paso < 4 && (
                          <Button color="success" className="btn-round" onClick={siguiente} style={{ minWidth: "140px" }}>
                            Siguiente
                            <i className="nc-icon nc-minimal-right ml-1" />
                          </Button>
                        )}
                        {paso === 4 && (
                          <Button color="success" className="btn-round" onClick={handleSubmit} disabled={enviando} style={{ minWidth: "200px" }}>
                            {enviando ? "Enviando..." : (
                              <><i className="nc-icon nc-send mr-1" />Enviar Matrícula</>
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

export default FormularioMatriculaPage;
