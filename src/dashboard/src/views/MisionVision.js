import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Alert,
} from "reactstrap";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

function MisionVisionManage() {
  const [mision, setMision] = useState({
    file: null,
    description: "",
    imageUrl: "",
  });
  const [vision, setVision] = useState({
    file: null,
    description: "",
    imageUrl: "",
  });
  const [misionErrorMessage, setMisionErrorMessage] = useState("");
  const [visionErrorMessage, setVisionErrorMessage] = useState("");
  const [misionSuccessMessage, setMisionSuccessMessage] = useState("");
  const [visionSuccessMessage, setVisionSuccessMessage] = useState("");

  // Formatos de imagen permitidos
  const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

  useEffect(() => {
    fetchMision();
    fetchVision();
  }, []);

  // Obtener Misión
  const fetchMision = async () => {
    try {
      const response = await axios.get(
        "https://alinambiback.onrender.com/api/mision"
      );
      if (response.data) {
        setMision({
          ...mision,
          description: response.data.description,
          imageUrl: response.data.filename
            ? `https://alinambiback.onrender.com/api/mision-images/${response.data.filename}`
            : "",
        });
      }
    } catch (error) {
      console.error("Error al obtener Misión:", error);
    }
  };

  // Obtener Visión
  const fetchVision = async () => {
    try {
      const response = await axios.get(
        "https://alinambiback.onrender.com/api/vision"
      );
      if (response.data) {
        setVision({
          ...vision,
          description: response.data.description,
          imageUrl: response.data.filename
            ? `https://alinambiback.onrender.com/api/vision-images/${response.data.filename}`
            : "",
        });
      }
    } catch (error) {
      console.error("Error al obtener Visión:", error);
    }
  };

  // Validar si el archivo es una imagen
  const validateImageFile = (file) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return false;
    }
    return true;
  };

  // Para la gestión de la Misión
  const handleMisionUpload = async (e) => {
    e.preventDefault();
    setMisionErrorMessage("");
    setMisionSuccessMessage("");

    if (!mision.file && !mision.description) {
      setMisionErrorMessage(
        "Debes subir una imagen o ingresar una descripción."
      );
      return;
    }

    if (mision.file && !validateImageFile(mision.file)) {
      setMisionErrorMessage(
        "Solo se permiten archivos de imagen (JPEG, PNG, GIF)."
      );
      return;
    }

    const formData = new FormData();
    if (mision.file) formData.append("image", mision.file);
    if (mision.description) formData.append("description", mision.description);

    try {
      const response = await axios.post(
        "https://alinambiback.onrender.com/api/mision",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMision({
        ...mision,
        description: response.data.description,
        imageUrl: response.data.filename
          ? `https://alinambiback.onrender.com/api/mision-images/${response.data.filename}`
          : "",
      });
      setMisionSuccessMessage("Misión actualizada correctamente.");
      setTimeout(() => setMisionSuccessMessage(""), 3000);
    } catch (error) {
      setMisionErrorMessage("Cambie de imagen o suba una nueva por favor.");
    }
  };

  // Para la gestión de la Visión
  const handleVisionUpload = async (e) => {
    e.preventDefault();
    setVisionErrorMessage("");
    setVisionSuccessMessage("");

    if (!vision.file && !vision.description) {
      setVisionErrorMessage(
        "Debes subir una imagen o ingresar una descripción."
      );
      return;
    }

    if (vision.file && !validateImageFile(vision.file)) {
      setVisionErrorMessage(
        "Solo se permiten archivos de imagen (JPEG, PNG, GIF)."
      );
      return;
    }

    const formData = new FormData();
    if (vision.file) formData.append("image", vision.file);
    if (vision.description) formData.append("description", vision.description);

    try {
      const response = await axios.post(
        "https://alinambiback.onrender.com/api/vision",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setVision({
        ...vision,
        description: response.data.description,
        imageUrl: response.data.filename
          ? `https://alinambiback.onrender.com/api/vision-images/${response.data.filename}`
          : "",
      });
      setVisionSuccessMessage("Visión actualizada correctamente.");
      setTimeout(() => setVisionSuccessMessage(""), 3000);
    } catch (error) {
      setVisionErrorMessage("Cambie de imagen o suba una nueva por favor.");
    }
  };

  // Eliminar Misión
  const handleDeleteMision = async () => {
    try {
      await axios.delete("https://alinambiback.onrender.com/api/mision");
      setMision({ file: null, description: "", imageUrl: "" });
      setMisionSuccessMessage("Misión eliminada correctamente.");
      setTimeout(() => setMisionSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error al eliminar Misión:", error);
      setMisionErrorMessage("Error al eliminar Misión.");
    }
  };

  // Eliminar Visión
  const handleDeleteVision = async () => {
    try {
      await axios.delete("https://alinambiback.onrender.com/api/vision");
      setVision({ file: null, description: "", imageUrl: "" });
      setVisionSuccessMessage("Visión eliminada correctamente.");
      setTimeout(() => setVisionSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error al eliminar Visión:", error);
      setVisionErrorMessage("Error al eliminar Visión.");
    }
  };

  return (
    <>
      <br />
      <br />
      <div className="content">
        {/* Card para la Misión */}
        <Card className="mt-4" style={{ maxWidth: "92%", marginLeft: "4%" }}>
          <CardBody>
            <CardTitle tag="h4" className="text-center mb-4">
              <FaCloudUploadAlt size={30} className="mr-2" />
              Misión
            </CardTitle>
            <p className="text-center text-muted">
              Describe la Misión de la institución.
            </p>
            {misionErrorMessage && (
              <Alert color="danger">{misionErrorMessage}</Alert>
            )}
            {misionSuccessMessage && (
              <Alert color="success">{misionSuccessMessage}</Alert>
            )}
            {mision.imageUrl && (
              <div className="text-center mb-4">
                <img
                  src={mision.imageUrl}
                  alt="Misión"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            )}
            <Form onSubmit={handleMisionUpload}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>Descripción</label>
                    <Input
                      type="text"
                      value={mision.description}
                      onChange={(e) =>
                        setMision({ ...mision, description: e.target.value })
                      }
                      placeholder="Descripción de la Misión"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label>Subir imagen</label>
                    <Input
                      type="file"
                      onChange={(e) =>
                        setMision({ ...mision, file: e.target.files[0] })
                      }
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button color="primary" type="submit">
                Editar Misión
              </Button>
              <Button
                color="danger"
                onClick={handleDeleteMision}
                className="ml-2"
              >
                Eliminar Misión
              </Button>
            </Form>
          </CardBody>
        </Card>

        {/* Card para la Visión */}
        <Card className="mt-4" style={{ maxWidth: "92%", marginLeft: "4%" }}>
          <CardBody>
            <CardTitle tag="h4" className="text-center mb-4">
              <FaCloudUploadAlt size={30} className="mr-2" />
              Visión
            </CardTitle>
            <p className="text-center text-muted">
              Describe la Visión de la institución.
            </p>
            {visionErrorMessage && (
              <Alert color="danger">{visionErrorMessage}</Alert>
            )}
            {visionSuccessMessage && (
              <Alert color="success">{visionSuccessMessage}</Alert>
            )}
            {vision.imageUrl && (
              <div className="text-center mb-4">
                <img
                  src={vision.imageUrl}
                  alt="Visión"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            )}
            <Form onSubmit={handleVisionUpload}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>Descripción</label>
                    <Input
                      type="text"
                      value={vision.description}
                      onChange={(e) =>
                        setVision({ ...vision, description: e.target.value })
                      }
                      placeholder="Descripción de la Visión"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label>Subir imagen</label>
                    <Input
                      type="file"
                      onChange={(e) =>
                        setVision({ ...vision, file: e.target.files[0] })
                      }
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Button color="primary" type="submit">
                Editar Visión
              </Button>
              <Button
                color="danger"
                onClick={handleDeleteVision}
                className="ml-2"
              >
                Eliminar Visión
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default MisionVisionManage;
