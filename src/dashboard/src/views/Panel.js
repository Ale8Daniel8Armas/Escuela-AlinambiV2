import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Button,
} from "reactstrap";

// Importar imágenes
import managementConsultingGif from "../../../assets/img/gifts/management-consulting.gif";
import folderGif from "../../../assets/img/gifts/folder.gif";
import studentGif from "../../../assets/img/gifts/student.gif";
import targetGif from "../../../assets/img/gifts/target.gif";
import writingGif from "../../../assets/img/gifts/writing.gif";

// Datos de las tarjetas
const sidebarItems = [
  {
    name: "Lista de Usuarios",
    path: "/admin/user-page",
    imageSrc: managementConsultingGif,
    description: "Administra y visualiza todos los usuarios administradores.",
  },
  {
    name: "Gestión de Archivos",
    path: "/admin/files",
    imageSrc: folderGif,
    description: "Sube, descarga y organiza archivos fácilmente.",
  },
  {
    name: "Consejo Estudiantil",
    path: "/admin/members",
    imageSrc: studentGif,
    description:
      "Información y gestión del consejo estudiantil y foto de las docentes.",
  },
  {
    name: "Misión y Visión",
    path: "/admin/misionVision",
    imageSrc: targetGif,
    description: "Edición de la misión y visión de la institución.",
  },
  {
    name: "Matrícula",
    path: "/admin/matriculaInfo",
    imageSrc: writingGif,
    description:
      "Edita la información de los costos, requerimientos y sus fechas.",
  },
];

function DashboardPresentation() {
  return (
    <>
      <br />
      <div className="content">
        <Row>
          {sidebarItems.map((item, index) => (
            <Col md="4" key={index} className="mb-4">
              <Card className="animated-card">
                <CardBody className="text-center">
                  <img
                    src={item.imageSrc}
                    alt={item.name}
                    className="gif-image"
                  />
                  <CardTitle tag="h4" className="mt-3">
                    {item.name}
                  </CardTitle>
                  <CardText className="text-muted">{item.description}</CardText>
                  <Button
                    color="primary"
                    href={item.path}
                    className="btn-round mt-3"
                  >
                    Ir a {item.name}
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        <style>
          {`
            .animated-card {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              border-radius: 15px;
              overflow: hidden;
              border: none;
            }
            .animated-card:hover {
              transform: translateY(-10px);
              box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
            }
            .gif-image {
              width: 100%;
              height: 180px;
              object-fit: cover;
              border-radius: 10px;
            }
            .btn-round {
              border-radius: 20px;
              padding: 10px 20px;
              font-weight: bold;
            }
            .text-muted {
              color: #6c757d !important;
            }
          `}
        </style>
      </div>
    </>
  );
}

export default DashboardPresentation;
