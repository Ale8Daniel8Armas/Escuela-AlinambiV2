import { useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Card, CardBody, Collapse } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import {Marker, Popup } from "react-leaflet";


const customIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
});


const ContactAgenda = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="container text-center mt-4">
      <h1 className="display-4" style={{ color: "#1E90FF" }}>
        Agenda de contactos
      </h1>
      <div className="h1">📖</div>

      <Card className="mt-4 p-4">
        <h2
          className="text-center"
          style={{
            fontSize: "33px",
            fontWeight: "bold",
            color: "#1E90FF",
            letterSpacing: "1.5px",
            marginBottom: "15px",
            textTransform: "uppercase",
            marginTop: "35px",
          }}
        >
          Contáctanos
        </h2>
        <p className="fst-italic">¡Estaremos gustosos de atenderte!</p>
        <p>
          <strong>Teléfonos:</strong> 3033284 - 3033988
        </p>
        <p>
          <strong>Dirección:</strong> Calle Panzaleo - E8-213 y Fajardo
        </p>

        <div className="d-flex justify-content-center gap-3 fs-2 mt-3">
          <FaFacebook className="text-primary cursor-pointer" />
          <FaInstagram className="text-danger cursor-pointer" />
          <FaWhatsapp className="text-success cursor-pointer" />
          <FaTiktok className="text-dark cursor-pointer" />
        </div>
      </Card>

      <Card className="mt-4">
        <CardBody>
          <div className="btn-group d-flex">
            <Button color="primary">Departamentos y oficinas</Button>
          </div>

          <div className="mt-3">
            {[
              "Secretaría General 2389283",
              "Centro Médico 2390293",
              "Fundación 232039",
              "WhatsApp 29839283",
            ].map((item) => (
              <div key={item} className="border-bottom p-2">
                <Button
                  color="link"
                  className="w-100 text-start"
                  onClick={() => toggleSection(item)}
                >
                  {item} {openSections[item] ? "" : ""}
                </Button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <h2 className="mt-4" style={{ color: "#1E90FF" }}>
        Ubicación
      </h2>
      <div className="mt-2" style={{ height: "400px", width: "100%" }}>
       <MapContainer
        center={[-0.324162, -78.479500]}
        zoom={15} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        <Marker position={[-0.324162, -78.479500]} icon={customIcon}>
          <Popup>📍 Aquí está la institución</Popup>
        </Marker>
      </MapContainer>
      </div>
      <br />
    </div>
  );
};

export default ContactAgenda;
